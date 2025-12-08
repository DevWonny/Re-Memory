"use client";
// component
import CameraBlender from "./components/cameraBlender";
export default function Main() {
  return (
    <div className="main-container w-full flex">
      <div className="camera-blending-container">
        <CameraBlender />
      </div>
      <div className="folder-container">Folder Container</div>
    </div>
  );
}
