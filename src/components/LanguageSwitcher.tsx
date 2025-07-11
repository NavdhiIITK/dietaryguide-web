import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", rtl: true },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const selectedLang = languages.find(lang => lang.code === i18n.language);
    if (selectedLang) {
      setCurrentLanguage(selectedLang);
      
      // Handle RTL layout
      const htmlElement = document.documentElement;
      if (selectedLang.rtl) {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.classList.add('rtl');
      } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.classList.remove('rtl');
      }
    }
  }, [i18n.language]);

  const handleLanguageChange = async (languageCode: string) => {
    const selectedLang = languages.find(lang => lang.code === languageCode);
    if (selectedLang) {
      await i18n.changeLanguage(languageCode);
      setCurrentLanguage(selectedLang);
      
      // Save to localStorage
      localStorage.setItem('dietaryguide-language', languageCode);
      
      // Handle RTL layout
      const htmlElement = document.documentElement;
      if (selectedLang.rtl) {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.classList.add('rtl');
      } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.classList.remove('rtl');
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-full border-forest dark:border-spring hover:bg-forest/10 dark:hover:bg-spring/10"
          aria-label={t('common.language')}
        >
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline-block font-medium">
            {currentLanguage.nativeName}
          </span>
          <Globe className="h-4 w-4 sm:hidden" />
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background/95 backdrop-blur-lg border border-border/50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer hover:bg-muted/50 ${
              currentLanguage.code === language.code 
                ? "bg-primary/10 text-primary" 
                : ""
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">
                {language.name}
              </span>
            </div>
            {currentLanguage.code === language.code && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
