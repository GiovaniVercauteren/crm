import OasezorgLogo from "@/components/common/oasezorg-logo";
import ThemeToggle from "@/components/common/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="fixed top-0 right-0">
        <ThemeToggle />
      </div>
      <section className="md:hidden md:w-1/2">
        <OasezorgLogo width={64} height={64} />
      </section>
      <section className="md:w-1/2">{children}</section>
      <section className="hidden md:block md:w-1/2">SideBanner</section>
    </div>
  );
}
