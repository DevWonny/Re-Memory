"use client";
// component
import CameraBlender from "./components/cameraBlender";
// style
import "@/styles/main.scss";

export default function Main() {
  return (
    <div className="main-container w-full h-screen flex">
      <div className="camera-blending-container w-[50%] h-screen">
        <CameraBlender />
      </div>
      {/* 폴더로 표출될 영역. 이미지가 저장 될때 카테고리(여행지) 별로 저장을 할 예정. 폴더는 해당 카테고리를 의미함. */}
      <div className="folder-container w-[50%] h-screen">Folder Container</div>
    </div>
  );
}
