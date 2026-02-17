// * 수정 페이지
// * 업로드 페이지와 동일한 레이아웃으로 가져 갈 예정
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
// components
import CommonInput from "@/app/components/commonInput";
// store
import { useAuth } from "@/store/auth";
import { useDetail } from "@/store/detail";
// service
import { uploadImage } from "@/services/upload";
// style
import "@/styles/modify.scss";
import "swiper/css";
import "swiper/css/effect-cards";
import "react-day-picker/style.css";

interface UploadFile {
  file: File;
  previewUrl: string;
}

export default function Upload() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<UploadFile[]>([]);
  const { session } = useAuth();
  const storeDetailData = useDetail((state) => state.storeDetailData);
  const storeDetailImage = useDetail((state) => state.storeDetailImage);
  const [category, setCategory] = useState(storeDetailData?.category);
  const [description, setDescription] = useState(storeDetailData?.description);
  const [dateRange, setDateRange] = useState<any>(() => {
    if (storeDetailData) {
      const from = new Date(storeDetailData.date_from);
      const to = new Date(storeDetailData.date_to);
      return {
        from,
        to,
      };
    }
  });

  // function
  const onAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const files = e.target.files;
    // if (!files) {
    //   return;
    // }
    // const newImages = Array.from(files).map((file) => ({
    //   file,
    //   previewUrl: URL.createObjectURL(file),
    // }));
    // setImages((prev) => [...prev, ...newImages]);
    // e.target.value = "";
  };

  const onRemoveImage = (image: any) => {
    // const findFile = image.previewUrl;
    // if (!findFile) return;
    // const result = images.filter((image) => image.previewUrl !== findFile);
    // setImages(result);
  };

  const onOpenInput = () => {
    // if (!imageInputRef.current) {
    //   console.log("Upload Page On Open Input Error!");
    //   return;
    // }
    // imageInputRef.current.click();
  };

  const onReset = () => {
    // if (images.length === 0) {
    //   return;
    // }
    // setImages([]);
    // if (imageInputRef.current) {
    //   imageInputRef.current.value = "";
    // }
  };

  const onCancelClick = () => {
    setImages([]);
    router.replace("/");
  };

  const onSaveClick = async () => {
    // if (!session) {
    //   console.log("Upload Page Error! - onSaveClick");
    //   return;
    // }
    // await uploadImage(
    //   session.user.id,
    //   images,
    //   dateRange,
    //   category,
    //   description,
    // );
  };

  return (
    <div className="modify-page flex items-center justify-center w-screen h-screen">
      <div className="modify-container flex flex-col items-center justify-between w-[70%] h-[70%]">
        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`top-perforation-${index}`} />
          ))}
        </div>

        <div className="contents-container flex justify-around items-center w-full h-full">
          <div className="contents w-[48%] h-[95%] flex flex-col items-center justify-start">
            {/* // * Image Preview */}
            <div className="preview-content">
              {storeDetailImage.length > 0 ? (
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="preview-swiper flex items-center justify-center w-full h-full"
                >
                  {storeDetailImage.map((image, index) => (
                    <SwiperSlide key={`preview-swiper-image-${index}`}>
                      <img
                        src={image.url}
                        alt="Preview Image"
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="no-preview w-full h-full flex items-center justify-center">
                  추억을 기록해주세요 🎞️
                </div>
              )}
            </div>
            {/* // * Image List  */}
            <div className="image-list-content">
              {storeDetailImage.length > 0 ? (
                storeDetailImage.map((img, index) => (
                  <p
                    key={`image-list-item-${index}`}
                    onClick={() => onRemoveImage(img)}
                  >
                    {img.name}
                  </p>
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

          <div className="contents w-[48%] h-[95%] flex flex-col items-center justify-start gap-[20px]">
            {/* // * Category , Description , Button(Cancel, Save) */}
            <div className="content w-full">
              <p className="label">🚗 여행지</p>
              <CommonInput
                type="category"
                inputVal={category ? category : ""}
                onChangeVal={setCategory}
              />
            </div>

            <div className="content w-full relative">
              <details>
                <summary className="label cursor-pointer list-none">
                  📆 추억을 만들 날
                </summary>
                <DayPicker
                  className="day-picker"
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  footer={
                    <button
                      aria-label="완료"
                      className="selected-button cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open");
                      }}
                    >
                      {dateRange ? "선택완료" : "닫기"}
                    </button>
                  }
                ></DayPicker>
              </details>
              <p className="date-range">
                {dateRange &&
                  `${dayjs(dateRange.from).format("YYYY-MM-DD")} ~ ${dayjs(
                    dateRange.to,
                  ).format("YYYY-MM-DD")}`}
              </p>
            </div>

            <div className="content w-full">
              <p className="label">📸 추억</p>
              <CommonInput
                type="description"
                inputVal={description ? description : ""}
                onChangeVal={setDescription}
              />
            </div>

            <div className="button-content flex w-fit">
              <button className="cancel-button" onClick={onCancelClick}>
                취소
              </button>
              <button className="save-button" onClick={onSaveClick}>
                저장
              </button>
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
