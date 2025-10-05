import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import SellerPage from "./pages/SellerPage";
import AdminSellerPage from "./pages/AdminSellerPage";
import PaymentPage from "./pages/PaymentPage";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // Admin Dashboard Routes
  {
    path: "/admin",
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
        element: <AdminSellerPage />,
      },
      {
        path: "payments",
        element: <PaymentPage />,
      },
    ],
  },
  // Seller Dashboard Routes
  {
    path: "/seller",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <SellerPage />,
      },
    ],
  },
  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
