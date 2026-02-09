/* eslint-disable @typescript-eslint/no-explicit-any */
// *  row : directory 
// * id : number, user_id, uuid, image array , text, date, text
// * user_id와 UUID를 통해서 수정 및 상세 페이지 호출
import { supabase } from '@/lib/supabase';

interface UploadFile {
  file: File,
  previewUrl: string
}

export const uploadImage = async (userId: string, images: UploadFile[], dateRange: any, category: string, description: string) => {

  // * Image Upload 및 DB용 변환
  const imageDBList = await Promise.all(
    images.map(async ({ file }) => {
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
  );

  const { error } = await supabase.from('folder').insert({
    user_id: userId,
    description,
    category,
    date_from: dateRange.from,
    date_to: dateRange.to,
    images: imageDBList,
  })

  if (error) {
    console.log('Upload Error')
    throw error;
  }
}