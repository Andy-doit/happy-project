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
