import { supabase } from "@/lib/supabase";

// * Main에서 표출될 폴더 리스트 호출
export const fetchFolderList = async (userId: string) => {
  const { data, error } = await supabase.from('folder').select('id, category, date_from, date_to').eq('user_id', userId);
  if (error) {
    console.log('Fetch Folder List Error - ', error);
    return [];
  }
  return data;
}

// * Detail에서 표출될 데이터 호출
export const fetchDetail = async (userId: string) => {
  const { data, error } = await supabase.from('folder').select('*').eq('user_id', userId);
  if (error) {
    console.log('Fetch Detail Error - ', error);
    return;
  }

  return data;
}

