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

export default function Modify() {
  const params = useParams();
  const storeDetailData = useDetail((state) => state.storeDetailData);
  const storeDetailImage = useDetail((state) => state.storeDetailImage);

  useEffect(() => {
    console.log("🚀 ~ Modify ~ params:", params);
    console.log("🚀 ~ Modify ~  storeDetailData:", storeDetailData);
    console.log("🚀 ~ Modify ~ storeDetailImage:", storeDetailImage);
  }, []);

  return (
    <div className="modify-page w-full h-full ">
      <p>수정 페이지</p>
    </div>
  );
}
