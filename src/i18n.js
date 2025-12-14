import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";
const storedLanguage = localStorage.getItem("i18nextLng");
const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    lng: storedLanguage || "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
