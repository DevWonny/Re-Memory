// * 이미지 업로드 페이지
// * 가운데 업로드 관련 내용 보여줄 예정.
// * 업로드 관련 내용 배경은 필름 프레임을 구현해서 작업.
// * Break Point -> sm(40rem, 640px)을 기준으로 작업
// * PC -> 좌우 형태로 레이아웃 구성(필름 프레임이 가로로 길게 2칸으로)
// *    -> 좌측에는 미리보기(drag & drop형식) + 파일(파일 개별 제거 및 전체 제거) / 우측에는 분류(카페고리 - 여행지), 설명 , 버튼
// * Mobile -> 위에서 부터 순서대로 이미지 미리보기(darg & drop형식) - 클릭해서 파일 추가(파일 개별 제거 및 전체 제거 버튼 필요)
// *        -> 분류(카테고리 - 여행지) - 설명 - 버튼(취소, 저장)

"use client";
// style
import "@/styles/upload.scss";

export default function Upload() {
  return (
    <div className="upload-page flex items-center justify-center w-screen h-screen">
      <div className="upload-container flex flex-col items-center justify-between w-[70%] h-[50%]">
        <div className="perforation">
          {Array.from({ length: 24 }).map((_, index) => (
            <p key={`top-perforation-${index}`} />
          ))}
        </div>

        <div className="contents-container flex justify-around items-center w-full h-full">
          <div className="content w-[48%] h-[85%]"></div>
          <div className="content w-[48%] h-[85%]"></div>
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
