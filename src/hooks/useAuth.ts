import authApiRequest from "../apiRequest/auth";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { ROLE } from "@/contansts/type";
import { useAuthStore } from "@/hooks/store";

export const useLogin = () => {
    const { setIsAuth, setRole } = useAuthStore();

    const handleLogin = async (values: LoginBodyType, navigate: (path: string) => void) => {
        try {
            const result = await authApiRequest.sLogin(values);
            if (!result.payload?.data?.admin?.role) {
                throw new Error("Dữ liệu trả về từ server không hợp lệ");
            }
            toast.success(result.payload.message);
            const role = result.payload.data.admin.role;
            setIsAuth(true);
            setRole(role);
            if (!Object.values(ROLE).includes(role)) {
                toast.error("Vai trò không hợp lệ!");
                navigate("/error");
                return;
            }
            if (role === ROLE.SUPER_ADMIN) {
                navigate("/TestPage");
            } else if (role === ROLE.ADMIN) {
                navigate("/Test");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            handleErrorApi({ error });
            throw error;
        }
    };

    return { handleLogin };
};
