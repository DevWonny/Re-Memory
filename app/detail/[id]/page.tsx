// * 폴더 클릭시 이동되는 페이지
// * 최상단 우측에 뒤로가기 버튼
// * 1. 선택한 이미지 보기(스와이프 or 좌우 버튼 클릭 시 이전/이후 이미지 보이게) / 처음에 들어오면 저장된 이미지 중 1번이 나오게
// * 2. 해당 카테고리에 저장된 이미지 작게 해서 모든 이미지 표출(선택된 이미지는 border 처리)
// * 3. 저장시 작성했던 내용들 표출(설명 등)
// * 4. 수정, 삭제 버튼 구현. (수정 클릭 시 수정페이지로 이동. 삭제 버튼 클릭시 팝업 띄우기)

"use client";
import { useParams } from "next/navigation";

export default function Detail() {
  const params = useParams();

  return (
    <div className="detail-page">
      <h1>Image Detail Page {params.id}</h1>
    </div>
  );
}
