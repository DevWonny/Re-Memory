/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
// * 수정 페이지
// * 전체적인 레이아웃은 Upload 페이지와 동일하게
// * 버튼 명칭과 라우팅 위치, 해당 카테고리 이미지들을 그대로 표출해야 함
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// store
import { useAuth } from "@/store/auth";
import { useDetail } from "@/store/detail";

// style
import "@/styles/modify.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Modify() {
  const params = useParams();
  const storeDetailData = useDetail((state) => state.storeDetailData);
  const storeDetailImage = useDetail((state) => state.storeDetailImage);
  const [swiper, setSwiper] = useState<any>(null);
  const [activeSwiperIndex, setActiveSwiperIndex] = useState(0);

  const onBackClick = () => {
    console.log("Modify Back Click");
  };

  const onModifyClick = () => {
    console.log("Modify Click!");
  };

  useEffect(() => {
    console.log("🚀 ~ Modify ~ params:", params);
    console.log("🚀 ~ Modify ~  storeDetailData:", storeDetailData);
    console.log("🚀 ~ Modify ~ storeDetailImage:", storeDetailImage);
  }, []);

  return (
    <div className="modify-page  w-full h-full flex items-center justify-center">
      <div className="modify-container w-[70%] h-full flex flex-col items-center justify-center">
        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`modify-top-perforation-${index}`}></p>
          ))}
        </div>

        <div className="modify-contents w-full h-full flex flex-col items-center justify-between">
          <Swiper
            className="main-image-container"
            pagination={true}
            navigation={true}
            modules={[Navigation, Pagination]}
            onSwiper={setSwiper}
            onSlideChange={(slide) => setActiveSwiperIndex(slide.activeIndex)}
          >
            {storeDetailImage.map((item, index) => (
              <SwiperSlide key={`detail-image-swiper-slide-${index}`}>
                <img src={`${item.url}`} alt="Detail Image" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="all-images-container flex items-center justify-center ">
            {storeDetailImage.map((item, index) => (
              <div
                key={`all-images-item-${index}`}
                className={`image-item ${activeSwiperIndex === 0 && "active"}`}
                onClick={() => swiper?.slideTo(0)}
              >
                <img src={`${item.url}`} alt="All Detail Image" />
              </div>
            ))}
          </div>

          <div className="folder-description-container ">
            <div className="content">
              <p className="label">🚗 여행지</p>
              <p>{storeDetailData?.category}</p>
            </div>

            <div className="content">
              <p className="label">📆 추억을 만들 날</p>
              <p>{`${storeDetailData?.date_from} ~ ${storeDetailData?.date_to}`}</p>
            </div>

            <div className="content">
              <p className="label">📸 추억</p>
              <p>{storeDetailData?.description}</p>
            </div>
          </div>

          <div className="button-container flex  w-fit">
            <button className="back-button" onClick={onBackClick}>
              돌아가기
            </button>
            <button className="modify-button" onClick={onModifyClick}>
              저장
            </button>
            {/* <button className="remove-button">삭제</button> */}
          </div>
        </div>

        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`modify-bot-perforation-${index}`}></p>
          ))}
        </div>
      </div>
    </div>
  );
}
