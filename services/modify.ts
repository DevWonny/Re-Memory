import { supabase } from '@/lib/supabase';
// type
import type { DateRange } from "react-day-picker";
import { PreviewImage } from '@/types/detail';

// interface
interface NewDBImage {
  file: File,
  previewUrl: string
}


export const modifyFolder = async (id: string, userId: string, newImages: NewDBImage[], removeImages: PreviewImage[], dateRange: DateRange, category: string, description: string) => {
  // * DB 조회
  const { data: currentDB } = await supabase.from('folder').select('*').eq('id', id).single();
  const currentImage: PreviewImage[] = currentDB.images ?? [];

  // * Storage에서 이미지 제거
  if (removeImages?.length > 0) {
    const { error } = await supabase.storage.from('images').remove(removeImages.map((img) => img.path!));
    if (error) {
      console.log('Service Modify Error! - Storage Remove Error')
      throw error;
    }
  }
  // * DB에서 이미지 제거
  const currentDBImages = currentImage.filter((img) => !removeImages.some((remove) => remove.path === img.path))

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


