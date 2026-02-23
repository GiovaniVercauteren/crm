import OasezorgLogo from "@/components/common/oasezorg-logo";
import ThemeToggle from "@/components/common/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="fixed top-0 right-0">
        <ThemeToggle />
      </div>
      <section className="mt-16">
        <OasezorgLogo height={128} />
      </section>
      <section className="flex justify-center">{children}</section>
    </div>
  );
}
