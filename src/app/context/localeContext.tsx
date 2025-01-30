"use client";

import { createContext, useContext, useState, useEffect } from "react";
import enData from '../locales/en.json'
import deData from '../locales/de.json'
// Define available languages
type Language = "en" | "de";

// Define the shape of translations
type Translations = {
  [key in Language]: Record<string, string>;
};
const en: Record<string, string> = enData as Record<string, string>;
const de: Record<string, string> = deData as Record<string, string>;
// Store translations
const translations: Translations = { en, de, };

// Context type
type LocaleContextType = {
  locale: Language;
  switchLocale: (lang: Language) => void;
  t: Record<string, string>;
};

// Create Context
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Locale Provider Component
export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Language>("en");

  // Load saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language | null;
    if (savedLang && translations[savedLang]) setLocale(savedLang);
  }, []);

  const switchLocale = (lang: Language) => {
    setLocale(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <LocaleContext.Provider value={{ locale, switchLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Hook for accessing LocaleContext
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within a LocaleProvider");
  return context;
};
