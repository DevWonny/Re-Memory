/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// * 폴더 클릭시 이동되는 페이지
// * 최상단 우측에 뒤로가기 버튼
// * 1. 선택한 이미지 보기(스와이프 or 좌우 버튼 클릭 시 이전/이후 이미지 보이게) / 처음에 들어오면 저장된 이미지 중 1번이 나오게
// * 2. 해당 카테고리에 저장된 이미지 작게 해서 모든 이미지 표출(선택된 이미지는 border 처리)
// * 3. 저장시 작성했던 내용들 표출(설명 등)
// * 4. 수정, 삭제 버튼 구현. (수정 클릭 시 수정페이지로 이동. 삭제 버튼 클릭시 팝업 띄우기)
// ! 로그인 안된 상태에서 url로 들어오는것 방지해야함.

"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// service
import { fetchDetail } from "@/services/detail";
// store
import { useAuth } from "@/store/auth";
import { useDetail } from "@/store/detail";
// style
import "@/styles/detail.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// interface
interface DetailDataType {
  category: string;
  date_from: string;
  date_to: string;
  description: string;
  images: DetailImageType[];
  user_id: string;
  id: string;
  create_at: string;
}

interface DetailImageType {
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
}

export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const session = useAuth((state) => state.session);
  const setStoreDetailData = useDetail((state) => state.setStoreDetailData);
  const setStoreDetailImage = useDetail((state) => state.setStoreDetailImage);
  const storeDetailData = useDetail((state) => state.storeDetailData);
  const storeDetailImage = useDetail((state) => state.storeDetailImage);
  const [swiper, setSwiper] = useState<any>(null);
  const [activeSwiperIndex, setActiveSwiperIndex] = useState(0);
  const [detailData, setDetailData] = useState<DetailDataType | null>(null);
  const [detailImage, setDetailImage] = useState<DetailImageType[]>([]);

  const onBackClick = () => {
    router.push("/");
  };

  const onModifyClick = () => {
    // if (detailData && detailImage) {
    //   setStoreDetailData(detailData);
    //   setStoreDetailImage(detailImage);
    // }

    // * 일단 뒤로가기 방지
    router.push(`/modify/${params.id}`);
  };

  useEffect(() => {
    if (session) {
      const onFetchDetail = async () => {
        const data = await fetchDetail(session.user.id, params.id as string);
        if (data && data.length > 0) {
          setStoreDetailData(data[0]);
          setStoreDetailImage(data[0].images);
          // setDetailData(data[0]);
          // setDetailImage(data[0].images);
        }
      };
      onFetchDetail();
    }
  }, [session, params]);

  useEffect(() => {
    // * 추후 확인 필요
    // setStoreDetailData(null);
    // setStoreDetailImage([]);
  }, []);

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
              수정
            </button>
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
