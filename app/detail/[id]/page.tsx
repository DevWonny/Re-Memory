/* eslint-disable @typescript-eslint/no-explicit-any */
// * 폴더 클릭시 이동되는 페이지
// * 최상단 우측에 뒤로가기 버튼
// * 1. 선택한 이미지 보기(스와이프 or 좌우 버튼 클릭 시 이전/이후 이미지 보이게) / 처음에 들어오면 저장된 이미지 중 1번이 나오게
// * 2. 해당 카테고리에 저장된 이미지 작게 해서 모든 이미지 표출(선택된 이미지는 border 처리)
// * 3. 저장시 작성했던 내용들 표출(설명 등)
// * 4. 수정, 삭제 버튼 구현. (수정 클릭 시 수정페이지로 이동. 삭제 버튼 클릭시 팝업 띄우기)

/* eslint-disable @next/next/no-img-element */

"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// service
// store
// style
import "@/styles/detail.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const [swiper, setSwiper] = useState<any>(null);
  const [activeSwiperIndex, setActiveSwiperIndex] = useState(0);

  const onBackClick = () => {
    router.push("/");
  };

  return (
    <div className="detail-page  w-full h-full flex items-center justify-center">
      <div className="detail-container w-[70%] h-full flex flex-col items-center justify-center">
        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`detail-top-perforation-${index}`}></p>
          ))}
        </div>

        <div className="detail-contents w-full h-full flex flex-col items-center justify-between">
          <Swiper
            className="main-image-container"
            pagination={true}
            navigation={true}
            modules={[Navigation, Pagination]}
            onSwiper={setSwiper}
            onSlideChange={(slide) => setActiveSwiperIndex(slide.activeIndex)}
          >
            <SwiperSlide>
              <img src="/photo_1.jpg" alt="Swiper Image 1" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/photo_2.jpg" alt="Swiper Image 2" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/photo_3.jpg" alt="Swiper Image 3" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/folder.png" alt="Swiper Image 4" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/test1.png" alt="Swiper Image 5" />
            </SwiperSlide>
          </Swiper>

          <div className="all-images-container flex items-center justify-center ">
            <div
              className={`image-item ${activeSwiperIndex === 0 && "active"}`}
              onClick={() => swiper?.slideTo(0)}
            >
              <img src="/photo_1.jpg" alt="Swiper Image 1" />
            </div>
            <div
              className={`image-item ${activeSwiperIndex === 1 && "active"}`}
              onClick={() => swiper?.slideTo(1)}
            >
              <img src="/photo_2.jpg" alt="Swiper Image 2" />
            </div>
            <div
              className={`image-item ${activeSwiperIndex === 2 && "active"}`}
              onClick={() => swiper?.slideTo(2)}
            >
              <img src="/photo_3.jpg" alt="Swiper Image 3" />
            </div>
            <div
              className={`image-item ${activeSwiperIndex === 3 && "active"}`}
              onClick={() => swiper?.slideTo(3)}
            >
              <img src="/folder.png" alt="Swiper Image 4" />
            </div>
            <div
              className={`image-item ${activeSwiperIndex === 4 && "active"}`}
              onClick={() => swiper?.slideTo(4)}
            >
              <img src="/test1.png" alt="Swiper Image 5" />
            </div>
          </div>

          <div className="folder-description-container ">
            <div className="content">
              <p className="label">🚗 여행지</p>
              <p>여행지는 여기!</p>
            </div>

            <div className="content">
              <p className="label">📆 추억을 만들 날</p>
              <p>날짜는 여기!</p>
            </div>

            <div className="content">
              <p className="label">📸 추억</p>
              <p>description은 여기!</p>
            </div>
          </div>

          <div className="button-container flex  w-fit">
            <button className="back-button" onClick={onBackClick}>
              돌아가기
            </button>
            <button className="modify-button">수정</button>
            <button className="remove-button">삭제</button>
          </div>
        </div>

        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`detail-bot-perforation-${index}`}></p>
          ))}
        </div>
      </div>
    </div>
  );
}
