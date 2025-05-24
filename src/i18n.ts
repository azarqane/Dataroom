import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import ar from './locales/ar/translation.json';
import LanguageDetector from "i18next-browser-languagedetector";

// ⚠️ Attention : PAS besoin du backend si tu importes tout en "resources"
// (donc tu peux retirer la ligne Backend)

i18n
  .use(LanguageDetector) // AJOUTE CETTE LIGNE !
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar }
    },
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupQuerystring: "lng"
    }
  });

export default i18n;
