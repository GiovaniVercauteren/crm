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
    <div className="w-screen h-screen flex flex-col md:flex-row md:items-center">
      <div className="fixed top-0 right-0">
        <ThemeToggle />
      </div>
      <section className="mt-16 md:hidden md:w-1/2">
        <OasezorgLogo />
      </section>
      <section className="md:w-1/2 md:flex md:items-center md:justify-center">
        {children}
      </section>
      <section className="hidden md:block md:w-1/2 md:h-full md:p-8">
        <Card className="md:h-full md:flex md:items-center md:justify-center md:bg-linear-to-b from-rose-200/66 to-rose-200">
          <CardContent className="flex flex-col items-center gap-4">
            <OasezorgLogo className="md:scale-125 lg:scale-175" />
            <span
              className={`${lustriaRegular.className} text-4xl font-bold text-teal-700`}
            >
              CRM
            </span>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
