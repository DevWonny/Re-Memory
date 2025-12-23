"use client";
// component
import CameraBlender from "./components/cameraBlender";
import Folder from "./components/folder";
// * Test
import Auth from "./components/auth";
// style
import "@/styles/main.scss";

// * Main(카테고리 선택 삭제 + 전체 카테고리 삭제 버튼구현)
// * Break Point -> sm(640px, 40rem, 모바일) 사이즈 부터 좌우가 아닌 상하 형태로 변경. 아래 폴더는 3개씩.
export default function Main() {
  return (
    <div className="main-container w-full h-screen flex md:flex-row sm:flex-col sm:h-full max-sm:flex-col max-sm:h-full">
      <div className="camera-blending-container md:w-[50%] md:h-screen sm:w-full sm:h-[300px] max-sm:w-full max-sm:h-[300px]">
        <CameraBlender />
      </div>
      {/* 폴더로 표출될 영역. 이미지가 저장 될때 카테고리(여행지) 별로 저장을 할 예정. 폴더는 해당 카테고리를 의미함. */}
      {/* 무한 스크롤 사용 예정 */}
      <div className="folder-container md:w-[50%] h-screen grid  auto-rows-[140px] grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-3 sm:w-full ">
        {Array.from({ length: 10 }).map((_, index) => (
          <Folder key={`test-${index}`} />
        ))}
      </div>
      <Auth type="register" />
    </div>
  );
}
