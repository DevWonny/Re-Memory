// * Main 화면에 뿌려질 카테고리 폴더
// * 폴더 이미지 + 카테고리 명 + 이미지 몇개 저장 되어있는지 표출

"use client";
// component
import Image from "next/image";
import folder from "@/public/folder.png";

export default function Folder() {
  return (
    <div className="folder-item w-full h-full  p-[20px] flex items-center justify-center">
      <Image
        src={folder}
        alt="Folder Image"
        className="w-fit h-full object-contain cursor-pointer"
      ></Image>
    </div>
  );
}
