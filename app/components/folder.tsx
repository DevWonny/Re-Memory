/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
// * Main 화면에 뿌려질 카테고리 폴더
// * 폴더 이미지 + 카테고리 명 + 저장 날짜 + 이미지 몇개 저장 되어있는지 표출

"use client";
import dayjs from "dayjs";
// component
import Image from "next/image";
import folder from "@/public/folder.png";
import label from "@/public/label.png";
import "@/styles/components/folder.scss";

// interface
interface FolderType {
  data: any;
  onFolderClick: () => void;
}

export default function Folder({ data, onFolderClick }: FolderType) {
  return (
    <div
      className="folder-item w-full h-full  p-[20px] flex items-center justify-center relative"
      onClick={onFolderClick}
    >
      <Image
        src={folder}
        alt="Folder Image"
        className="w-fit h-full object-contain cursor-pointer"
      ></Image>

      <div className="text-container absolute cursor-pointer flex flex-col">
        <p className="label-category">{`${data.category}`}</p>
        <p className="label-created">{`${dayjs(data.created_at).format("YY.MM.DD")}`}</p>
      </div>
    </div>
  );
}
