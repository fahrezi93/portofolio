
"use client";

import React, { useState, createContext, useContext } from 'react';
import { translations, Translation } from '@/data/translations';

type Language = 'en' | 'id';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation['en'] | Translation['id'];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
