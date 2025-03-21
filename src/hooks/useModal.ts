import { create } from "zustand";
import { devtools } from 'zustand/middleware';

interface ModalStoreState {
  open?: boolean;
  setOpen: (open: boolean) => void;
  openChild?: boolean;
  setOpenChild: (open: boolean) => void;
  articleId?: string;
  setArticleId: (id: string) => void;
  resetModalStore: () => void;
}

export const useModalStore = create<ModalStoreState>()(
  devtools((set) => ({
    open: false,
    openChild: false,
    articleId: undefined,
    setArticleId: (id: string) => set({ articleId: id }),
    setOpenChild: (open: boolean) => set({ openChild: open }),
    setOpen: (open: boolean) => set({ open }),
    resetModalStore: () => set({ open: false, openChild: false, articleId: undefined }),
  }))
);

