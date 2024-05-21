// manageRoutes.js
import { Navigate } from 'react-router-dom';
import { Dashboard } from "../pages/manage/Dashboard";
import { UserControl } from "../pages/manage/userControl";
import { RoleControl } from "../pages/manage/roleControl";
import { MenuControl } from "../pages/manage/menuControl";
import { OrderControl } from "../pages/manage/orderControl";
import { ProductControl } from "../pages/manage/productControl";
import { ClassificationControl } from "../pages/manage/classificationControl";
import { Login } from "../pages/manage/Login";

const manageRouters = [
  {
    path: "login",
    element: <Login />
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "userControl",
        element: <UserControl />
      },
      {
        path: "roleControl",
        element: <RoleControl />
      },
      {
        path: "menuControl",
        element: <MenuControl />
      },
      {
        path: "orderControl",
        element: <OrderControl />
      },
      {
        path: "productsControl",
        element: <ProductControl />
      },
      {
        path: "classControl",
        element: <ClassificationControl />
      },
      {
        path: "*",
        element: <Navigate to="userControl" replace />
      }
    ]
  },
  {
    path: "",
    element: <Navigate to="login" replace />
  },
  {
    path: "*",
    element: <Navigate to="login" replace />
  }
];

export default manageRouters