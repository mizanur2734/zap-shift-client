import {
  createBrowserRouter,
} from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authention/Login/Login";
import Register from "../pages/Authention/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
        {
            index: true,
            Component: Home,
        }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
            path: "login",
            Component: Login
        },
        {
            path: "register",
            Component: Register
        }
    ]
  }
]);