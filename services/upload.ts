/* eslint-disable @typescript-eslint/no-explicit-any */
// *  row : directory 
// * id : number, user_id, uuid, image array , text, date, text
// * user_id와 UUID를 통해서 수정 및 상세 페이지 호출
import { supabase } from '@/lib/supabase';

interface UploadFile {
  file: File,
  previewUrl: string
}

interface ImageDB {
  path: string,
  preview_url: string,
  name: string,
  size: number,
  type: string
}

export const uploadImage = async (userId: string, images: UploadFile[], dateRange: any, category: string, description: string) => {
  console.log("🚀 ~ addImage ~ userId:", userId)
  console.log("🚀 ~ addImage ~ description:", description)
  console.log("🚀 ~ addImage ~ category:", category)
  console.log("🚀 ~ addImage ~ dateRange:", dateRange)
  console.log("🚀 ~ addImage ~ images:", images)

  const uploadImageToStorage = await Promise.all(
    images.map(async ({ file }) => {
      console.log("🚀 ~ uploadImage ~ file:", file)
      const path = `${crypto.randomUUID()}-${file.name}`

      const { error } = await supabase.storage.from('images').upload(path, file);

      if (error) {
        console.log('Upload Image To Storage Error');
        throw error;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(path);

      return {
        path, url: data.publicUrl, name: file.name, size: file.size, type: file.type
      }
    })
  )

}