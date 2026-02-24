import MainSidebar from "./_components/main-sidebar";
import PathBreadcrumbs from "./_components/path-breadcrumbs";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainSidebar>
      <PathBreadcrumbs />
      <div>{children}</div>
    </MainSidebar>
  );
}
