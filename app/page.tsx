/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// component
import CameraBlender from "./components/cameraBlender";
import Folder from "./components/folder";
// service
import { fetchFolderList } from "@/services/detail";
// store
import { useAuth } from "@/store/auth";
// style
import "@/styles/main.scss";

// * Main(카테고리 선택 삭제 + 전체 카테고리 삭제 버튼구현)
// * Break Point -> sm(640px, 40rem, 모바일) 사이즈 부터 좌우가 아닌 상하 형태로 변경. 아래 폴더는 3개씩.
export default function Main() {
  const router = useRouter();
  const [folderList, setFolderList] = useState<any>([]);
  const session = useAuth((state) => state.session);

  useEffect(() => {
    if (!session) {
      return;
    }

    const onFetchFolderList = async () => {
      const fetchData = await fetchFolderList(session.user.id);
      if (fetchData && fetchData.length > 0) {
        setFolderList(fetchData);
      } else {
        setFolderList([]);
      }
    };

    onFetchFolderList();
  }, [session]);

  useEffect(() => {
    console.log("🚀 ~ Main ~ folderList:", folderList);
  }, [folderList]);

  return (
    <div className="main-container w-full h-screen flex md:flex-row sm:flex-col sm:h-full max-sm:flex-col max-sm:h-full">
      <div className="camera-blending-container md:w-[50%] md:h-screen sm:w-full sm:h-[300px] max-sm:w-full max-sm:h-[300px]">
        <CameraBlender />
      </div>
      {/* 폴더로 표출될 영역. 이미지가 저장 될때 카테고리(여행지) 별로 저장을 할 예정. 폴더는 해당 카테고리를 의미함. */}
      {/* 무한 스크롤 사용 예정 */}
      <div className="folder-container md:w-[50%] h-screen grid  auto-rows-[140px] grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-3 sm:w-full ">
        {folderList.length > 0 ? (
          folderList.map((folder: any) => (
            // * Folder 데이터로 표출할수 있는 부분 수정 필요
            <Folder
              key={`folder-icon-${folder.id}`}
              data={folder}
              onFolderClick={() => router.push(`/detail/${folder.id}`)}
            />
          ))
        ) : (
          <div>{`아직 구현 안됨(빈 공간 텍스트 및 이미지 추가 필요)`}</div>
        )}
      </div>
    </div>
  );
}
