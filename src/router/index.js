import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import userRouters from "./userRouters";
import manageRouters from "./manageRouters";


const router = createBrowserRouter([
  {
    path: "/manage",
    element: <Outlet />,
    children: manageRouters
  },
  {
    path: "/user",
    element: <Outlet />,
    children: userRouters
  },
  {
    path: "*",
    element: <Navigate to="/manage" />
  }

]);

export default router;
