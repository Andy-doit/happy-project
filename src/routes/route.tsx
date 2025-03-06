import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import HomeAdmin from "@/pages/admin/home";
import Login from "@/pages/auth/loginPage";
import PrivateRoute from "./privateRoute";
import { ErrorPage } from "@/pages/error/errorPage";
import { ROLE } from "@/contansts/type";

export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: (
            <AdminLayout>
                <PrivateRoute inverted={false} requiredRoles={[ROLE.SUPER_ADMIN]}>
                    <HomeAdmin />
                </PrivateRoute>
            </AdminLayout>
        ),
    },
    {
        path: "/error",
        element: (
            <PrivateRoute inverted={false}>
                <ErrorPage />
            </PrivateRoute>
        ),
    },
    {
        path: "/login",
        element: (
            <PrivateRoute inverted={true}>
                <Login />
            </PrivateRoute>
        ),
    },

]);