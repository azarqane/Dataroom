import React from "react";
import { useTranslation } from "react-i18next";
import {
  Shield,
  Lock,
  Users,
  FileText,
  Mail,
  CheckCircle,
  Info,
} from "lucide-react";

export default function PrivacyPage() {
  const { t, i18n } = useTranslation("translation");
  const isAr = i18n.language.startsWith("ar");

  // Icônes contextuelles pour chaque bloc
  const ICON_SIZE = 34;
  const sections = [
    {
      icon: <FileText size={ICON_SIZE} className="text-teal-600 ml-3" />,
      title: t("privacy.dataCollectionTitle"),
      desc: [
        t("privacy.dataCollection1"),
        t("privacy.dataCollection2"),
        t("privacy.dataCollection3"),
      ],
    },
    {
      icon: <Users size={ICON_SIZE} className="text-teal-600 ml-3" />,
      title: t("privacy.usageTitle"),
      desc: [t("privacy.usage")],
    },
    {
      icon: <Shield size={ICON_SIZE} className="text-teal-600 ml-3" />,
      title: t("privacy.securityTitle"),
      desc: [t("privacy.security")],
    },
    {
      icon: <CheckCircle size={ICON_SIZE} className="text-teal-600 ml-3" />,
      title: t("privacy.rightsTitle"),
      desc: [t("privacy.rights1"), t("privacy.rights2")],
    },
    {
      icon: <Mail size={ICON_SIZE} className="text-teal-600 ml-3" />,
      title: t("privacy.contactTitle"),
      desc: [t("privacy.contact")],
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-white via-blue-50 to-teal-50`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <section className="py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield size={48} className="text-teal-500 drop-shadow-md" />
          </div>
          <h1 className="text-4xl font-extrabold text-teal-700 mb-3 tracking-tight leading-tight">
            {t("privacy.title")}
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-4">{t("privacy.intro")}</p>
          <div className="flex justify-center">
            <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-xl text-base font-semibold tracking-wide shadow-sm">
              NeutVault • {new Date().getFullYear()}
            </span>
          </div>
        </div>

        {/* Les sections */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sections.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-start gap-4 transition-all hover:shadow-2xl hover:border-teal-100 animate-fadein"
              style={{
                animationDelay: `${idx * 80}ms`,
                animationDuration: "600ms",
              }}
            >
              <div className="flex items-center mb-2">
                {s.icon}
                <h2 className="ml-3 text-xl font-bold text-teal-700">{s.title}</h2>
              </div>
              {s.desc.length > 1 ? (
                <ul className="pl-3 mt-2 text-gray-700 space-y-2 text-base">
                  {s.desc.map((line, lidx) => (
                    <li key={lidx} className="flex items-start gap-2">
                      <span className="mt-1 text-teal-400">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-base mt-2">{s.desc[0]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Baseline ou info complémentaire */}
        <div className="max-w-xl mx-auto mt-16 bg-teal-50 rounded-xl p-6 flex flex-col items-center gap-2 border border-teal-100 shadow">
          <Info className="text-teal-400 mb-1" size={28} />
          <div className="text-base text-gray-600 font-medium text-center">
            {t("privacy.security")}
          </div>
        </div>
      </section>
    </div>
  );
}
