/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface DetailDataType {
  category: string;
  date_from: string;
  date_to: string;
  description: string;
  images: DetailImageType[];
  user_id: string;
  id: string;
  create_at: string;
}

interface DetailImageType {
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
}

interface DetailData {
  storeDetailData: DetailDataType | null,
  storeDetailImage: DetailImageType[],
  setStoreDetailData: (detailData: DetailDataType | null) => void,
  setStoreDetailImage: (detailImage: DetailImageType[]) => void,
}


export const useDetail = create<DetailData>()(
  devtools(set => ({
    storeDetailData: null,
    storeDetailImage: [],
    setStoreDetailData: (storeDetailData) => set({ storeDetailData }),
    setStoreDetailImage: storeDetailImage => set({ storeDetailImage })
  }))
)
