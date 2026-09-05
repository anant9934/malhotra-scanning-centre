"use client";

import React, { createContext, useContext } from 'react';
import type { Locale } from '@/i18n/config';

type Dictionary = any; // We can type this strictly based on en.ts later

interface I18nContextType {
  locale: Locale;
  dictionary: Dictionary;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ 
  children, 
  locale, 
  dictionary 
}: { 
  children: React.ReactNode; 
  locale: Locale; 
  dictionary: Dictionary;
}) {
  return (
    <I18nContext.Provider value={{ locale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
