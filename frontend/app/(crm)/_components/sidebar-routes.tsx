import { Role } from "@/lib/client/types.gen";
import {
  BrickWallShield,
  CircleUser,
  LayoutDashboard,
  UserCog,
} from "lucide-react";

export type SidebarNavigationGroup = {
  header?: string;
  items?: SidebarNavigationItem[];
  requiredRole?: Role;
};

export type SidebarNavigationItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

const mainRoutes: SidebarNavigationItem[] = [
  {
    name: "dashboard",
    href: "/",
    icon: <LayoutDashboard />,
  },
];

const accountManagementRoutes: SidebarNavigationItem[] = [
  {
    name: "account",
    href: "/account-management/account",
    icon: <CircleUser />,
  },
  {
    name: "settings",
    href: "/account-management/settings",
    icon: <UserCog />,
  },
];

const adminRoutes: SidebarNavigationItem[] = [
  {
    name: "admin",
    href: "/admin",
    icon: <BrickWallShield />,
  },
];

export const routes: SidebarNavigationGroup[] = [
  {
    items: mainRoutes,
  },
  {
    header: "account-management",
    items: accountManagementRoutes,
  },
  {
    header: "admin",
    items: adminRoutes,
    requiredRole: "admin",
  },
];

// TODO: Add user role based route filtering, e.g. only show admin routes to admin users
