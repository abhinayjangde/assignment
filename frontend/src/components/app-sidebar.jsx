import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconShoppingCart,
  IconPlus,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useAuthStore } from "@/store";

// Admin navigation items
const adminNavMain = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: IconFolder,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: IconUsers,
  },
  {
    title: "Sellers",
    url: "/admin/sellers",
    icon: IconListDetails,
  },
  {
    title: "Payments",
    url: "/admin/payments",
    icon: IconChartBar,
  },
];

// Seller navigation items
const sellerNavMain = [
  {
    title: "Dashboard",
    url: "/seller",
    icon: IconFolder,
  },
  {
    title: "Add Product",
    url: "/seller/products",
    icon: IconPlus,
  },
  {
    title: "My Products",
    url: "/seller/products",
    icon: IconShoppingCart,
  },
];

export function AppSidebar({ ...props }) {
  const { role } = useAuthStore((state) => state);

  // Determine which navigation items to show based on role
  const navItems = role === "admin" ? adminNavMain : sellerNavMain;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  {role === "admin" ? "Admin Panel" : "Seller Dashboard"}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: role, email: `${role}@example.com` }} />
      </SidebarFooter>
    </Sidebar>
  );
}
