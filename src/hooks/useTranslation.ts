import { Language } from "@/types/language";
import {
  Translation,
  TranslationPath,
  TranslationValue,
} from "@/types/translations";
import get from "lodash/get";

interface TranslationHook {
  t: <P extends TranslationPath>(key: P) => TranslationValue<P>;
  tExists: (key: TranslationPath) => boolean;
}

export function useTranslation(
  translations: Record<Language, Translation>,
  currentLanguage: Language,
): TranslationHook {
  const t = <P extends TranslationPath>(key: P): TranslationValue<P> => {
    const value = get(translations[currentLanguage], key);

    if (value === undefined) {
      console.warn(
        `Translation missing for key: ${key} in language: ${currentLanguage}`,
      );
      // Fallback to English if available
      const fallback = get(translations["en"], key);
      if (fallback !== undefined) {
        return fallback as TranslationValue<P>;
      }
      // Return appropriate empty value based on the expected type
      if (key.includes("items")) {
        return [] as TranslationValue<P>;
      }
      return "" as TranslationValue<P>;
    }

    return value as TranslationValue<P>;
  };

  const tExists = (key: TranslationPath): boolean => {
    return get(translations[currentLanguage], key) !== undefined;
  };

  return { t, tExists };
}
