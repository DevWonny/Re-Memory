import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoadingData {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
}

export const useLoading = create<LoadingData>()(
  devtools(set => ({
    isLoading: false,
    setIsLoading: isLoading => set({ isLoading })
  }))
)