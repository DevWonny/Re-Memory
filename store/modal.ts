import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// type
export type ModalType = 'SIGNUP_COMPLETE' | 'WITHDRAW_WARNING' | 'WITHDRAW_COMPLETE' | 'FOLDER_DELETE' | 'POST_COMPLETE' | 'WITHDRAWAL_ERROR' | 'MODIFY_VALIDATION' | 'MODIFY_COMPLETE';

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
  devtools(set => ({
    isOpen: false,
    type: null,
    openModal: (type) => set({ isOpen: true, type }),
    closeModal: () => set({ isOpen: false, type: null })
  }))
)

