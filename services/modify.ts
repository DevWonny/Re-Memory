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

interface NewDBImage {
  file: File,
  previewUrl: string
}


export const modifyFolder = async (id: any, userId: string, newImages: NewDBImage[], removeImages: any, dateRange: any, category: string, description: string) => {
  console.log("🚀 ~ modifyFolder ~ id:", id)
  console.log("🚀 ~ modifyFolder ~ description:", description)
  console.log("🚀 ~ modifyFolder ~ category:", category)
  console.log("🚀 ~ modifyFolder ~ dateRange:", dateRange)
  console.log("🚀 ~ modifyFolder ~ removeImages:", removeImages)
  console.log("🚀 ~ modifyFolder ~ newImages:", newImages)
  console.log("🚀 ~ modifyFolder ~ userId:", userId)

  // * DB 조회
  const { data: currentDB } = await supabase.from('folder').select('*').eq('id', id).single();
  const currentImage = currentDB.images ?? [];

  // * Storage에서 이미지 제거
  if (removeImages?.length > 0) {
    await supabase.storage.from('images').remove(removeImages.map((img: any) => img.path));
  }
  // * DB에서 이미지 제거
  const currentDBImages = currentImage.filter((img: any) => !removeImages.some((remove: any) => remove.path === img.path))

  // * 이미지 추가

  const newImageDBList = await Promise.all(
    (newImages ?? []).map(async ({ file }) => {
      const path = `${crypto.randomUUID()}`;
      const { error } = await supabase.storage.from('images').upload(path, file);

      if (error) {
        console.log('Service Modify Error! - newImageDBList');
        throw error;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(path);
      return { path, url: data.publicUrl, name: file.name, size: file.size, type: file.type }
    })
  )

  const resultImages = [...currentDBImages, ...newImageDBList];

  const { error } = await supabase.from('folder').update({
    category,
    description,
    date_from: dateRange.from,
    date_to: dateRange.to,
    images: resultImages
  }).eq('id', id);

  if (error) {
    console.log('Service Modify Error! - update')
    throw error
  }
}


