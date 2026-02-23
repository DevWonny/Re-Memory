/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';

// interface
interface ModifyImageType {
  name: string,
  path: string,
  size: number,
  type: string | null,
  url: string;
}

export const modifyFolder = async (id: any, userId: string, images: ModifyImageType[], removeImages: any, dateRange: any, category: string, description: string) => {
  console.log("🚀 ~ modifyFolder ~ id:", id)
  console.log("🚀 ~ modifyFolder ~ description:", description)
  console.log("🚀 ~ modifyFolder ~ category:", category)
  console.log("🚀 ~ modifyFolder ~ dateRange:", dateRange)
  console.log("🚀 ~ modifyFolder ~ removeImages:", removeImages)
  console.log("🚀 ~ modifyFolder ~ images:", images)
  console.log("🚀 ~ modifyFolder ~ userId:", userId)

  // * DB 조회
  const { data: currentDB } = await supabase.from('folder').select('*').eq('id', id);
  console.log(currentDB)
}