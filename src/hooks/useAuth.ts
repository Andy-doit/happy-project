import authApiRequest from "../apiRequest/auth";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { ROLE } from "@/contansts/type";
import { useAuthStore } from "@/hooks/store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const { setIsAuth, setRole } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: async ({ values }: { values: LoginBodyType }) => {
            return await authApiRequest.sLogin(values);
        },
        onSuccess: (result) => {
            if (!result.payload?.data?.admin?.role) {
                throw new Error("Dữ liệu trả về từ server không hợp lệ");
            }

            toast.success(result.payload.message);
            const role = result.payload.data.admin.role;
            setIsAuth(true);
            setRole(role);

            const navigate = useNavigate();

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
        },
        onError: (error) => {
            handleErrorApi({ error });
        }
    });

    return { loginMutation };
};
