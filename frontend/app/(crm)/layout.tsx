import MainFooter from "./_components/main-footer";
import MainSidebar from "./_components/main-sidebar";
import PathBreadcrumbs from "./_components/path-breadcrumbs";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainSidebar>
      <PathBreadcrumbs />
      <div className="flex flex-col grow">
        <main className="grow">{children}</main>
        <MainFooter />
      </div>
    </MainSidebar>
  );
}
