import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicyPage");

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-6">{t("description")}</p>
      <h2 className="text-2xl font-semibold mb-2">
        {t("informationWeCollect")}
      </h2>
      <p className="mb-4">{t("informationWeCollectDescription")}</p>
      <h2 className="text-2xl font-semibold mb-2">
        {t("howWeUseInformation")}
      </h2>
      <p className="mb-4">{t("howWeUseInformationDescription")}</p>
      <h2 className="text-2xl font-semibold mb-2">{t("dataSecurity")}</h2>
      <p className="mb-4">{t("dataSecurityDescription")}</p>
      <h2 className="text-2xl font-semibold mb-2">{t("yourChoices")}</h2>
      <p className="mb-4">{t("yourChoicesDescription")}</p>
      <h2 className="text-2xl font-semibold mb-2">{t("contactUs")}</h2>
      <p className="mb-4">{t("contactUsDescription")}</p>
    </div>
  );
}
