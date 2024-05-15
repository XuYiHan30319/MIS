import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { UserControl } from "../pages/userControl";

function isLogin() {
    console.log(localStorage.getItem("isLogin"));
    return localStorage.getItem("isLogin") === "true";
}

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: isLogin() ? <Dashboard /> : <Navigate to="/login" replace />,
        children: [
            {
                path: "userControl", // 修改这里为相对路径
                element: <UserControl />
            }
        ]
    },
    {
        path: "/",
        element: <Navigate to="/login" replace /> // 重定向到 /login
    }
]);


export default router;