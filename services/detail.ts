import { supabase } from "@/lib/supabase";
interface ImageData {
  name: string,
  path: string,
  size: number,
  type: string,
  url: string,
}

// * Main에서 표출될 폴더 리스트 호출
export const fetchFolderList = async (userId: string) => {
  const { data, error } = await supabase.from('folder').select('id, category, created_at').eq('user_id', userId);
  if (error) {
    console.log('Fetch Folder List Error - ', error);
    return [];
  }
  return data;
}

// * Detail에서 표출될 데이터 호출
// * id -> 게시물 ID
export const fetchDetail = async (userId: string, id: string) => {
  const { data, error } = await supabase.from('folder').select('*').eq('user_id', userId).eq('id', id);
  if (error) {
    console.log('Fetch Detail Error - ', error);
    return;
  }

  return data;
}

// * 삭제 시 호출 (단일)
export const removeDetail = async (id: string) => {
  // * 삭제할 폴더 row 호출
  const { data: folder, error: fetchError } = await supabase.from('folder').select('images').eq('id', id).single();
  if (fetchError) {
    console.log('Remove Fetch Error!');
    throw fetchError;
  }

  // * Storage에 저장된 이미지 삭제
  if (folder.images && folder.images.length > 0) {
    const pathList = folder.images.map((img: ImageData) => img.path)
    const { error: storageRemoveError } = await supabase.storage.from('images').remove(pathList);

    if (storageRemoveError) {
      console.log('Remove Storage Error!');
      throw storageRemoveError;
    }
  }

  // * row 삭제
  const { error: deleteError } = await supabase.from('folder').delete().eq('id', id);
  if (deleteError) {
    console.log('Delete Error!')
    throw deleteError;
  }
}


