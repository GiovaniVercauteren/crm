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

export default function MainSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("RouteSegments");

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="floating">
        <SidebarHeader className="flex items-center">
          <OasezorgLogo className="h-10 w-auto" />
          <Separator orientation="horizontal" />
        </SidebarHeader>
        <SidebarContent>
          {routes.map((group, index) => (
            <SidebarGroup key={index}>
              {group.header && <SidebarHeader>{t(group.header)}</SidebarHeader>}
              <SidebarMenu>
                {group.items?.map((item, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        {item.icon}
                        {t(item.name)}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
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
