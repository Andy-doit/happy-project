import { Navigate } from "react-router-dom";
import React from "react";
import { ErrorPage } from "@/pages/error/errorPage";
import { useAuthStore } from "@/hooks/store";

interface PrivateRouteProps {
    inverted?: boolean; 
    children: React.ReactNode;
    requiredRoles?: string[];
}

const PrivateRoute = ({ inverted = false, children, requiredRoles }: PrivateRouteProps) => {
    const { isAuth, role } = useAuthStore();
    if (inverted) {
        return isAuth ? <Navigate to="/" /> : children;
    }

    if (!isAuth) {
        return <Navigate to="/login" />;
    }


    if (requiredRoles && role && !requiredRoles.some((r) => role === r)) {
        return <ErrorPage />;
    }

    return children;
};

export default PrivateRoute;