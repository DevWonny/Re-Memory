/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthData {
  session: any,
  setSession: (session: any) => void
}

export const useAuth = create<AuthData>()(
  devtools(set => ({
    session: null,
    setSession: (session) => set({ session })
  }))
)