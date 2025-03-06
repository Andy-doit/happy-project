// src/hooks/store.ts
import { create } from 'zustand';
import authApiRequest from "../apiRequest/auth";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { ROLE } from "@/contansts/type";

interface AuthState {
    isAuth: boolean;
    role: string | null;
    setIsAuth: (value: boolean) => void;
    setRole: (role: string | null) => void;
    login: (values: LoginBodyType, navigate: (path: string) => void) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    role: null,
    setIsAuth: (value) => set({ isAuth: value }),
    setRole: (role) => set({ role }),
    login: async (values: LoginBodyType, navigate: (path: string) => void) => {
        try {
            const result = await authApiRequest.sLogin(values);
            if (!result.payload?.data?.admin?.role) {
                throw new Error("Dữ liệu trả về từ server không hợp lệ");
            }
            toast.success(result.payload.message);
            const role = result.payload.data.admin.role;
            set({ isAuth: true, role });
            if (!Object.values(ROLE).includes(role)) {
                toast.error("Vai trò không hợp lệ!");
                navigate("/error");
                return;
            }

            if (role === ROLE.SUPER_ADMIN) {
                navigate("/dashboard");
            } else if (role === ROLE.ADMIN) {
                navigate("/Test");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            handleErrorApi({ error });
            throw error;
        }
    },
}));