import { FormActionType, IDLE, IDLE_FORM, UserItemProps } from "@/contansts/type";
import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  role: string | null;
  setIsAuth: (value: boolean) => void;
  setRole: (role: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  role: null,
  setIsAuth: (value) => set({ isAuth: value }),
  setRole: (role) => set({ role }),
}));

interface UserStoreState {
  modalType: FormActionType;
  setModalType: (type: FormActionType) => void;
  userSelected: UserItemProps | null;
  setUserSelected: (user: UserItemProps | null) => void;
  articleId: string | undefined;
  setArticleId: (id: string | undefined) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  modalType: IDLE_FORM,
  setModalType: (modalType) => set({ modalType }),
  userSelected: null,
  setUserSelected: (userSelected) => set({ userSelected }),
  articleId: undefined,
  setArticleId: (articleId) => set({ articleId }),
}));

