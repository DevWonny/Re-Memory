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
// type
import { FolderListItem } from "@/types/detail";

// style
import "@/styles/main.scss";
import CameraRollIcon from "@mui/icons-material/CameraRoll";

// * Main(카테고리 선택 삭제 + 전체 카테고리 삭제 버튼구현)
// * Break Point -> sm(640px, 40rem, 모바일) 사이즈 부터 좌우가 아닌 상하 형태로 변경. 아래 폴더는 3개씩.
export default function Main() {
  const router = useRouter();
  const [folderList, setFolderList] = useState<FolderListItem[]>([]);
  const session = useAuth((state) => state.session);

  useEffect(() => {
    const onFetchFolderList = async () => {
      if (!session) {
        setFolderList([]);
        return;
      }
      const fetchData = await fetchFolderList(session.user.id);

      if (fetchData && fetchData.length > 0) {
        setFolderList(fetchData);
      } else {
        setFolderList([]);
      }
    };
    onFetchFolderList();
  }, [session]);

  return (
    <div className="main-container w-full h-screen flex md:flex-row sm:flex-col sm:h-full max-sm:flex-col max-sm:h-full">
      <div className="camera-blending-container md:w-[50%] md:h-screen sm:w-full sm:h-[300px] max-sm:w-full max-sm:h-[300px]">
        <CameraBlender />
      </div>
      {/* 폴더로 표출될 영역. 이미지가 저장 될때 카테고리(여행지) 별로 저장을 할 예정. 폴더는 해당 카테고리를 의미함. */}
      {/* 무한 스크롤 사용 예정 */}
      <div
        className={`folder-container md:w-[50%] h-screen ${folderList.length > 0 ? `grid  auto-rows-[140px] grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-3 sm:w-full` : "flex items-center justify-center"} `}
      >
        {folderList.length > 0 ? (
          folderList.map((folder: FolderListItem) => (
            // * Folder 데이터로 표출할수 있는 부분 수정 필요
            <Folder
              key={`folder-icon-${folder.id}`}
              data={folder}
              onFolderClick={() => router.push(`/detail/${folder.id}`)}
            />
          ))
        ) : (
          <div className="empty-folder-item flex flex-col items-center justify-center gap-[20px]">
            <CameraRollIcon className="empty-icon" />
            <p className="whitespace-pre text-center leading-[2] cursor-default">{`인화될 사진을 기다리고 있어요.\n여행지를 추가해보세요.`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
