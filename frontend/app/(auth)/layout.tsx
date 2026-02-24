import LanguageSelector from "@/components/common/language-selector";
import OasezorgLogo from "@/components/common/oasezorg-logo";
import ThemeToggle from "@/components/common/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="fixed flex m-4 gap-2 top-0 right-0">
        <LanguageSelector />
        <ThemeToggle />
      </div>
      <section className="flex justify-center mt-16">
        <OasezorgLogo className="h-20 md:h-32" />
      </section>
      <section className="flex justify-center">{children}</section>
    </div>
  );
}
