import OasezorgLogo from "@/components/common/oasezorg-logo";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <OasezorgLogo className="h-20 mb-16 md:h-32" />
      <h1 className="text-2xl font-bold">404 - {t("title")}</h1>
      <p className="mt-4">{t("description")}</p>
      <Link href="/" className="mt-6 underline">
        {t("homeButton")}
      </Link>
    </div>
  );
}
