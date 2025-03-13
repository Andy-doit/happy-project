import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import HomeAdmin from "@/pages/admin/home";
import Login from "@/pages/auth/loginPage";
import PrivateRoute from "./privateRoute";
import { ROLE } from "@/contansts/type";
import TestPage from "@/pages/testPage";
import { ErrorPage } from "@/pages/error/errorPage";

export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: (
            <AdminLayout>
                <PrivateRoute requiredRoles={[ROLE.SUPER_ADMIN]}>
                    <HomeAdmin />
                </PrivateRoute>
            </AdminLayout>
        ),
    },
    {
        path: "/login",
        element: (
            <PrivateRoute isLoginPage={true}>
                <Login />
            </PrivateRoute>

        ),
    },
    {
        path: "/TestPage",
        element: (
            <PrivateRoute requiredRoles={[ROLE.SUPER_ADMIN]}>
                <TestPage />
            </PrivateRoute>
        ),
    },
    {
        path: "/error",
        element: <ErrorPage />,
    },
    {
        path: "/",
        element: (
            <PrivateRoute requiredRoles={[ROLE.ADMIN]} >
                <AdminLayout>
                    <div>Welcome to Home</div>
                </AdminLayout>

            </PrivateRoute>
        ),
    },
]);