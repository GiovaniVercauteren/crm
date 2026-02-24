import {
  BrickWallShield,
  CircleUser,
  LayoutDashboard,
  UserCog,
} from "lucide-react";

export type SidebarNavigationGroup = {
  header?: string;
  items?: SidebarNavigationItem[];
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
    name: "profile",
    href: "/account-management/profile",
    icon: <CircleUser />,
  },
  {
    name: "settings",
    href: "/account-management/settings",
    icon: <UserCog />,
  },
];

const adminRoutes = [
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
  },
];
