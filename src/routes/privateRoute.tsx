import { Navigate } from "react-router-dom";
import React from "react";
import { ErrorPage } from "@/pages/error/errorPage";
import { useAuthStore } from "@/hooks/useAuth";



interface PrivateRouteProps {
    inverted: boolean;
    children: React.ReactNode;
    requiredRoles?: string[];
}

const PrivateRoute = ({ inverted, children, requiredRoles }: PrivateRouteProps) => {
    const { isAuth, role } = useAuthStore();

    if (inverted) {
        return isAuth ? <Navigate to="/" /> : children;
    }
    if (role && !requiredRoles?.some((r) => role === r)) return <ErrorPage />;
    return isAuth ? children : <Navigate to="/login" />;


};

export default PrivateRoute;