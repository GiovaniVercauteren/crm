import OasezorgLogo from "@/components/common/oasezorg-logo";
import ThemeToggle from "@/components/common/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { lustriaRegular } from "../layout";

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
        <OasezorgLogo />
      </section>
      <section className="flex justify-center">{children}</section>
    </div>
  );
}
