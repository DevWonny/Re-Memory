import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// type
import type { Session } from '@supabase/supabase-js';

interface AuthData {
  session: Session | null,
  setSession: (session: Session | null) => void
}

export const useAuth = create<AuthData>()(
  devtools(set => ({
    session: null,
    setSession: (session) => set({ session })
  }))
)