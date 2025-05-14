import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language, Region } from "@/types/language";

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  region: Region;
}

const languages: LanguageOption[] = [
  {
    code: "ru",
    label: "Русский",
    flag: "🇷🇺",
    region: "RU",
  },
  {
    code: "uz",
    label: "O'zbek",
    flag: "🇺🇿",
    region: "UZ",
  },
  {
    code: "en",
    label: "English",
    flag: "🇬🇧",
    region: "OTHER",
  },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 min-w-[120px] justify-center bg-white/50 backdrop-blur-sm"
        >
          <span className="text-lg leading-none">{currentLanguage?.flag}</span>
          <span className="text-sm font-medium">{currentLanguage?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/95 backdrop-blur-sm border shadow-lg min-w-[150px]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
              flex items-center gap-3 px-4 py-2.5
              ${language === lang.code ? "bg-primary/5 text-primary" : ""}
              hover:bg-primary/10 cursor-pointer
            `}
          >
            <span className="text-lg leading-none">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
