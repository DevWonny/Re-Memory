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
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
// components
import CommonInput from "@/app/components/commonInput";
// style
import "@/styles/upload.scss";
import "swiper/css";
import "swiper/css/effect-cards";

interface UploadFile {
  file: File;
  previewUrl: string;
}

export default function Upload() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<UploadFile[]>([]);

  // function
  const onAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const newImages = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
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
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const onCancelClick = () => {
    setImages([]);
    router.replace("/");
  };

  return (
    <div className="upload-page flex items-center justify-center w-screen h-screen">
      <div className="upload-container flex flex-col items-center justify-between w-[70%] h-[70%]">
        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`top-perforation-${index}`} />
          ))}
        </div>

        <div className="contents-container flex justify-around items-center w-full h-full">
          <div className="content w-[48%] h-[95%] flex flex-col items-center justify-start">
            {/* // * Image Preview */}
            <div className="preview-content">
              {images.length > 0 ? (
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="preview-swiper flex items-center justify-center w-full h-full"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={`preview-swiper-image-${index}`}>
                      <img
                        src={image.previewUrl}
                        alt="Preview Image"
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="no-preview w-full h-full flex items-center justify-center">
                  미리보기 없음.
                </div>
              )}
            </div>
            {/* // * Image List  */}
            <div className="image-list-content">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <p key={`image-list-item-${index}`}>{img.file?.name}</p>
                ))
              ) : (
                <div className="no-image-list w-full h-full flex items-center justify-center">
                  이미지를 추가하세요.
                </div>
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
            <div className="button-content flex w-fit">
              <button
                className="add-button cursor-pointer"
                onClick={onOpenInput}
              >
                사진 추가
              </button>

              <button className="reset-button cursor-pointer" onClick={onReset}>
                초기화
              </button>
            </div>
          </div>

          <div className="content w-[48%] h-[95%]">
            {/* // * Category , Description , Button(Cancel, Save) */}
            <CommonInput type="category" />
            <CommonInput type="description" />
            <div className="button-content flex w-fit">
              <button className="cancel-button" onClick={onCancelClick}>
                취소
              </button>
              <button className="save-button">저장</button>
            </div>
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
