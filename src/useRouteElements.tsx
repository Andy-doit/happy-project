import { useRoutes } from "react-router-dom"
import Login from "./app/pages/Login/Login"



export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: '/login',
            element: <Login />
        }
    ])

    return routeElements
}