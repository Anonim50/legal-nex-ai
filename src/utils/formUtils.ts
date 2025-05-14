import { SelectOption, TranslatedOptions } from "@/types/form";
import { toast } from "sonner";
import { TranslationPath, TranslationValue } from "@/types/translations";

interface FormError {
  message: string;
  type?: string;
  code?: string;
}

type TranslationFunction = <P extends TranslationPath>(key: P) => TranslationValue<P>;

/**
 * Safely transforms translation options into SelectOption format with improved error handling
 */
export const getTranslatedOptions = (
  rawOptions: Record<string, string> | string[],
  translationKey: string,
  defaultOptions: SelectOption[] = [],
): TranslatedOptions => {
  // Handle missing translations
  if (!rawOptions) {
    console.warn(`Missing translation for options: ${translationKey}`);
    return defaultOptions.length > 0 ? defaultOptions : null;
  }

  try {
    // Transform options to expected format
    if (Array.isArray(rawOptions)) {
      return rawOptions.map((option: string) => ({
        value: option,
        label: option,
      }));
    } else {
      return Object.entries(rawOptions).map(([value, label]) => ({
        value,
        label,
      }));
    }
  } catch (error: unknown) {
    const formError = error as FormError;
    console.error(`Error processing options for ${translationKey}:`, formError.message);
    return defaultOptions.length > 0 ? defaultOptions : null;
  }
};

/**
 * Determines if a form field has a validation error
 */
export const hasFormError = (
  field: string,
  errors: Record<string, FormError>,
): boolean => {
  return !!errors[field];
};

/**
 * Safely tries to get a translation with fallback
 */
export const safeTranslation = (
  translationFn: TranslationFunction,
  key: TranslationPath,
  fallback: string,
): string => {
  try {
    const translated = translationFn(key);
    return typeof translated === "string" ? translated : fallback;
  } catch (error: unknown) {
    const formError = error as FormError;
    console.warn(`Translation error for key: ${key}`, formError.message);
    return fallback;
  }
};

/**
 * Handles form submission errors with user feedback
 */
export const handleFormError = (error: unknown): void => {
  const formError = error as FormError;
  console.error("Form submission error:", formError);
  toast.error(formError?.message || "An error occurred. Please try again.");
};
