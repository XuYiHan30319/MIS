import { Login } from "../pages/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { UserControl } from "../pages/userControl";
import { RoleControl } from "../pages/roleControl";
import { MenuControl } from "../pages/menuControl";
import { Others } from "../pages/others";


// TODO:可能需要动态生成。。？
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "userControl",
        element: (
          <UserControl />
        )
      },
      {
        path: "roleControl",
        element: (
          <RoleControl />
        )
      },
      {
        path: "menuControl",
        element: (
          <MenuControl />
        )
      },
      {
        path: "*",
        element:<Others></Others>//显示他的路径
      }
    ]
  },
  {
    path: "/",
    element: <Navigate to="/login" replace /> // 重定向到 /login
  },
  {
    path: "*",
    element: <Navigate to="/login" replace /> // 重定向到 /login
  }
]);


export default router;