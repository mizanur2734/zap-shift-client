import {
  createBrowserRouter,
} from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authention/Login/Login";
import Register from "../pages/Authention/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoutes from "../routes/PrivateRoutes";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/dashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: "coverage",
            Component: Coverage,
            loader: () => fetch ('./servicesCenter.json')
        },
        {
          path: "sendParcel",
          element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
          loader: () => fetch ('./servicesCenter.json')
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
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        path: "myParcels",
        Component: MyParcels
      },
      {
        path: "payment/:parcelId",
        Component: Payment
      }
    ]
  }
]);