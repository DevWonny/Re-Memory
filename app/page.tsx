"use client";
// component
import CameraBlender from "./components/cameraBlender";
export default function Main() {
  return (
    <div className="main-container w-full flex">
      <div className="camera-blending-container w-[50%] h-screen">
        <CameraBlender />
      </div>
      <div className="folder-container">Folder Container</div>
    </div>
  );
}
