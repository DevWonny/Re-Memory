// * 이미지 업로드 페이지
// * 가운데 업로드 관련 내용 보여줄 예정.
// * 업로드 관련 내용 배경은 필름 프레임을 구현해서 작업.
// * Break Point -> sm(40rem, 640px)을 기준으로 작업
// * PC -> 좌우 형태로 레이아웃 구성(필름 프레임이 가로로 길게 2칸으로)
// *    -> 좌 : 이미지 미리보기(Swiper로 확인 하게) + 파일 추가 및 제거 + 초기화
// *    -> 우 : 카테고리 입력 + 설명 + 취소 및 저장 버튼
// * Mobile -> PC에서 좌우로 되어있던 것들을 상하로 Layout 변경
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from "react";
// style
import "@/styles/upload.scss";

export default function Upload() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  // function
  const onAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...newImages]);

    if (!previewImage && newImages.length > 0) {
      setPreviewImage(newImages[0]);
    }
  };

  const onOpenInput = () => {
    if (!imageInputRef.current) {
      console.log("Upload Page On Open Input Error!");
      return;
    }

    imageInputRef.current.click();
  };

  const onReset = () => {
    if (images.length === 0) {
      return;
    }

    setImages([]);
    setPreviewImage(null);
  };

  return (
    <div className="upload-page flex items-center justify-center w-screen h-screen">
      <div className="upload-container flex flex-col items-center justify-between w-[70%] h-[50%]">
        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`top-perforation-${index}`} />
          ))}
        </div>

        <div className="contents-container flex justify-around items-center w-full h-full">
          <div className="content w-[48%] h-[85%] flex flex-col">
            {/* // * Image Preview */}
            <div className="preview-content">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview Image"
                  className="w-[100px] h-[100px] object-contain"
                />
              ) : (
                <span>미리보기 없음.</span>
              )}
            </div>
            {/* // * Image List  */}
            <div className="image-list-content">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <p key={`image-list-item-${index}`}>{img}</p>
                ))
              ) : (
                <span>이미지를 추가하세요.</span>
              )}
            </div>

            {/* // * Input */}
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              ref={imageInputRef}
              onChange={onAddImages}
            />

            {/* // * Buttons */}
            <div className="button-content flex">
              <button
                className="add-button cursor-pointer"
                onClick={onOpenInput}
              >
                Image Add
              </button>

              <button className="reset-button cursor-pointer" onClick={onReset}>
                Reset
              </button>
            </div>
          </div>

          <div className="content w-[48%] h-[85%]">
            Description 관련(카테고리, 설명, 취소 및 저장 버튼)
          </div>
        </div>

        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`bot-perforation-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
