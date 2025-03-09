import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import HomeAdmin from "@/pages/admin/home";
import Login from "@/pages/auth/loginPage";
import PrivateRoute from "./privateRoute";

import { ROLE } from "@/contansts/type";
import TestPage from "@/pages/testPage";

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
    // {
    //     path: "/error",
    //     element: (
    //         <PrivateRoute inverted={false}>
    //             <ErrorPage />
    //         </PrivateRoute>
    //     ),
    // },
    {
        path: "/login",
        element: (
            <PrivateRoute inverted={true}>
                <Login />
            </PrivateRoute>
        ),
    },
    {
        path: "/TestPage",
        element: (

            <TestPage />

        ),
    },

]);