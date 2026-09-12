import React, { createContext, useContext, useState } from 'react';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import { gu } from '../i18n/gu';

const translationsMap = {
  en,
  hi,
  gu,
};

export type LanguageCode = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  language: LanguageCode;
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof en;
  translations: typeof en;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  currentLanguage: 'en',
  setLanguage: () => {},
  t: en,
  translations: en,
});

const PRIMARY_STORAGE_KEY = 'rupai_language';
const LEGACY_STORAGE_KEY = 'rupai-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(PRIMARY_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (saved === 'hi' || saved === 'gu' || saved === 'en') {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(PRIMARY_STORAGE_KEY, lang);
    localStorage.setItem(LEGACY_STORAGE_KEY, lang);
  };

  const t = translationsMap[language] || en;

  return (
    <LanguageContext.Provider value={{ language, currentLanguage: language, setLanguage, t, translations: t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en' as LanguageCode,
      currentLanguage: 'en' as LanguageCode,
      setLanguage: () => {},
      t: en,
      translations: en,
    };
  }
  return context;
};
