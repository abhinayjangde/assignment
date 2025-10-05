import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
  const { role } = useAuthStore((state) => state);
  const location = useLocation();

  // Check if user is logged in
  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  // Role-based access control
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isSellerRoute = location.pathname.startsWith("/seller");

  // Redirect if trying to access wrong dashboard
  if (isAdminRoute && role !== "admin") {
    return <Navigate to={role === "seller" ? "/seller" : "/"} replace />;
  }

  if (isSellerRoute && role !== "seller") {
    return <Navigate to={role === "admin" ? "/admin" : "/"} replace />;
  }

  // Normal users should not access any dashboard
  if (role === "user" && (isAdminRoute || isSellerRoute)) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
