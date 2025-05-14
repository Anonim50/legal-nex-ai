import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, Region } from "@/types/language";
import {
  Translation,
  TranslationPath,
  TranslationValue,
} from "@/types/translations";
import { detectBrowserLanguage } from "@/utils/languageDetection";
import { useTranslation } from "@/hooks/useTranslation";
import { useFormatting } from "@/hooks/useFormatting";
import en from "../locales/en/index";
import ru from "../locales/ru/index";
import uz from "../locales/uz/index";

const translations: Record<Language, Translation> = { en, ru, uz };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: <P extends TranslationPath>(key: P) => TranslationValue<P>;
  tExists: (key: TranslationPath) => boolean;
  region: Region;
  formatPhone: (phone: string) => string;
  formatDate: (date: Date | string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("ru");
  const [region, setRegion] = useState<Region>("UZ");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language | null;
    const storedRegion = localStorage.getItem("region") as Region | null;

    const { lang: detectedLang, region: detectedRegion } =
      detectBrowserLanguage();
    const initialLanguage = storedLanguage || detectedLang;
    const initialRegion = storedRegion || detectedRegion;

    setLanguageState(initialLanguage);
    setRegion(initialRegion);
    document.documentElement.lang = initialLanguage;
    setIsLoading(false);
  }, []);

  const setLanguage = async (lang: Language) => {
    setIsLoading(true);
    try {
      localStorage.setItem("language", lang);
      setLanguageState(lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(
        new CustomEvent("lang_toggle", { detail: { language: lang } }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { t, tExists } = useTranslation(translations, language);

  const { formatPhone, formatDate } = useFormatting(language);

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    tExists,
    region,
    formatPhone,
    formatDate,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
