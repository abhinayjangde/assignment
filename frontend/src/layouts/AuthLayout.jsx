import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isLoggedIn, role } = useAuthStore((state) => state);

  if (role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
