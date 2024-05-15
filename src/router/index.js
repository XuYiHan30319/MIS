import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { UserControl } from "../pages/userControl";
import { RoleControl } from "../pages/roleControl";
import PrivilegeControl from "../pages/privilegeControl";

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
        path: "RollControl",
        element: isAuthorize() ? <RoleControl /> : <Navigate to="/dashboard" replace />
      },
      {
        path: "PrivilegeControl",
        element: isAuthorize() ? <PrivilegeControl /> : <Navigate to="/dashboard" replace />
      }
    ]
  },
  {
    path: "/",
    element: <Navigate to="/login" replace /> // 重定向到 /login
  }
]);


export default router;