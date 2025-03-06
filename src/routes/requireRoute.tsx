import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuth";

interface RequireAuthProps {
    roles?: string[];
}

export default function RequireAuth({ roles }: RequireAuthProps) {
    const { role } = useAuthStore();
    const location = useLocation();
    if (!role) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (roles && role && !roles.some((r) => role.includes(r))) {
        return (
            <Navigate
                to="/own-tickets"
            />
        );
    }


    return <Outlet />;
}