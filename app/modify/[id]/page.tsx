// * 수정 페이지
// * 업로드 페이지와 동일한 레이아웃으로 가져 갈 예정
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { EffectCards } from "swiper/modules";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import dayjs from "dayjs";
// components
import CommonInput from "@/app/components/commonInput";
// store
import { useAuth } from "@/store/auth";
// service
import { modifyFolder } from "@/services/modify";
import { fetchDetail } from "@/services/detail";
// style
import "@/styles/modify.scss";
import "swiper/css";
import "swiper/css/effect-cards";
import "react-day-picker/style.css";

// type
import { DetailItem } from "@/types/detail";
interface PreviewImage {
  name: string;
  size: number;
  type: string;
  url: string;
  path?: string;
}

interface DBImage {
  file: File;
  previewUrl: string;
}

export default function Upload() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  // * 해당 페이지에서 미리보기로 보여줄 이미지. 해당 페이지에서만 활용됨.
  const [images, setImages] = useState<PreviewImage[]>([]);
  // * 삭제할 이미지 저장. supabase storage에서 완전히 삭제시 활용.
  const [removeImage, setRemoveImage] = useState<PreviewImage[]>([]);
  // * 추가할 이미지 저장. 수정 시 supabase로 넘겨줄 내용
  const [newImage, setNewImage] = useState<DBImage[]>([]);
  const { session } = useAuth();
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  // * Reset 기능에서 사용
  const [originalData, setOriginalData] = useState<DetailItem | null>(null);

  // function
  const onAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    // * 미리보기 용
    const newImage = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    // * DB용
    const newDBImage = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImage]);
    setNewImage((prev) => [...prev, ...newDBImage]);
    e.target.value = "";
  };

  const onRemoveImage = (image: PreviewImage) => {
    const findFile = image.url;
    if (!findFile) return;
    const removeImageList = images.filter((image) => image.url === findFile);
    const result = images.filter((image) => image.url !== findFile);
    setRemoveImage(removeImageList);
    setImages(result);
  };

  const onOpenInput = () => {
    if (!imageInputRef.current) {
      console.log("Upload Page On Open Input Error!");
      return;
    }
    imageInputRef.current.click();
  };

  const onReset = () => {
    if (!originalData) {
      return;
    }

    setImages(originalData.images);
    setCategory(originalData.category);
    setDescription(originalData.description);
    setDateRange(() => {
      const from = new Date(originalData.date_from);
      const to = new Date(originalData.date_to);
      return {
        from,
        to,
      };
    });
  };

  const onBackClick = () => {
    setImages([]);
    setCategory(null);
    setDescription(null);
    setDateRange(undefined);
    setRemoveImage([]);
    setNewImage([]);
    router.back();
  };

  const onModifyClick = async () => {
    if (
      !session ||
      images.length <= 0 ||
      !dateRange ||
      !category ||
      !description
    ) {
      console.log("Modify Page Error! - onSaveClick");
      alert("추억을 모두 채워주세요!");
      return;
    }

    await modifyFolder(
      params.id,
      session.user.id,
      newImage,
      removeImage,
      dateRange,
      category,
      description,
    );

    alert("수정이 완료되었습니다.");
    router.replace(`/detail/${params.id}`);
  };

  useEffect(() => {
    if (params.id && session) {
      const onFetchData = async () => {
        const data = await fetchDetail(session.user.id, params.id as string);
        if (data && data.length > 0) {
          setOriginalData(data[0]);
          setImages(data[0].images);
          setCategory(data[0].category);
          setDescription(data[0].description);
          setDateRange(() => {
            const from = new Date(data[0].date_from);
            const to = new Date(data[0].date_to);
            return { from, to };
          });
        }
      };
      onFetchData();
    }
  }, [params.id, session]);

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
              {images.length > 0 ? (
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="preview-swiper flex items-center justify-center w-full h-full"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={`preview-swiper-image-${index}`}>
                      <Image
                        src={image.url}
                        alt="Preview Image"
                        width={1000}
                        height={1000}
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
              {images.length > 0 ? (
                images.map((img, index) => (
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
              <button className="back-button" onClick={onBackClick}>
                돌아가기
              </button>
              <button className="modify-button" onClick={onModifyClick}>
                수정
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
