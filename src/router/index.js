import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { UserControl } from "../pages/userControl";
import { RoleControl } from "../pages/roleControl";
import { MenuControl } from "../pages/menuControl";

function isLogin() {
  return localStorage.getItem("isLogin") === "true";
}

function isAuthorize() {
  return localStorage.getItem("privilege") === "管理员";
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
        element: isAuthorize() ? <UserControl /> : <Navigate to="/dashboard" replace />
      },
      {
        path: "roleControl",
        element: isAuthorize() ? <RoleControl /> : <Navigate to="/dashboard" replace />
      },
      {
        path: "menuControl",
        element: isAuthorize() ? <MenuControl /> : <Navigate to="/dashboard" replace />

      }
    ]
  },
  {
    path: "/",
    element: <Navigate to="/login" replace /> // 重定向到 /login
  }
]);


export default router;