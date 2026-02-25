"use client";

import LanguageSelector from "@/components/common/language-selector";
import ThemeToggle from "@/components/common/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { routes } from "./sidebar-routes";
import Link from "next/link";
import { useTranslations } from "next-intl";
import OasezorgLogo from "@/components/common/oasezorg-logo";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/_actions/logout.action";
import { LogOut } from "lucide-react";
import RoleProtected from "@/components/common/role-protected";

export default function MainSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  const handleLogout = () => {
    logoutAction();
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="floating">
        <SidebarHeader className="flex items-center">
          <OasezorgLogo className="h-10 w-auto" />
          <Separator orientation="horizontal" />
        </SidebarHeader>
        <SidebarContent>
          {routes.map((group, index) => (
            <RoleProtected key={index} requiredRole={group.requiredRole}>
              <SidebarGroup>
                {group.header && (
                  <SidebarHeader className="text-sm font-semibold uppercase text-muted-foreground">
                    {t(`RouteSegments.${group.header}`)}
                  </SidebarHeader>
                )}
                <SidebarMenu>
                  {group.items?.map((item, idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          {item.icon}
                          {t(`RouteSegments.${item.name}`)}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </RoleProtected>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full mb-2"
            size="sm"
          >
            <LogOut />
            {t("Auth.logout")}
          </Button>
          <div className="flex items-center space-x-4">
            <LanguageSelector className="flex-1 w-full" />
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="py-2 px-4">{children}</main>
    </SidebarProvider>
  );
}
