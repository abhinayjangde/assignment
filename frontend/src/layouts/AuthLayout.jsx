import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router";
import Navbar from "@/components/Navbar";

const AuthLayout = () => {
  const { isLoggedIn, role } = useAuthStore((state) => state);

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  if (role === "seller") {
    return <Navigate to="/seller" replace />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
