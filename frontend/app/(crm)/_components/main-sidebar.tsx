import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function MainSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar side="left" variant="floating">
        <SidebarHeader>CRM</SidebarHeader>
      </Sidebar>
      <main className="py-2 px-4">{children}</main>
    </SidebarProvider>
  );
}
