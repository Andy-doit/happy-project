import { Navigate } from "react-router-dom";
import React from "react";
import { ErrorPage } from "@/pages/error/errorPage";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  isLoginPage?: boolean; // Thêm prop để kiểm tra trang login
}

const PrivateRoute = ({ children, requiredRoles, isLoginPage }: PrivateRouteProps) => {
  const isAuth = localStorage.getItem("accessToken");
  const role = localStorage.getItem("ROLE_USER");

  if (isAuth && isLoginPage) {
    return <ErrorPage />;
  }

  if (!isAuth && !isLoginPage) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && role && !requiredRoles.includes(role)) {
    return <ErrorPage />;
  }

  return children;
};

export default PrivateRoute;
