import { Login } from "../pages/Login/Login";

import { createBrowserRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        children: [
            
        ]
    },
    {
        path: "/",
        element: <Navigate to="/login" replace />,// 重定向到 /login
    }
])


export default router;