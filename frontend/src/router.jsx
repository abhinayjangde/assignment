import { createBrowserRouter } from "react-router";
import HomePage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import SellerPage from "./pages/SellerPage";
import PaymentPage from "./pages/PaymentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "sellers",
        element: <SellerPage />,
      },
      {
        path: "payments",
        element: <PaymentPage />,
      },
    ],
  },
]);
