"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/components/providers/I18nProvider';

export const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
  const { locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Create new path
    // Remove the current locale prefix if it exists
    const pathWithoutLocale = pathname?.replace(new RegExp(`^/${locale}(/|$)`), '/');
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    
    router.push(newPath);
  };

  if (mobile) {
    return (
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => switchLanguage('en')}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '4px',
            border: `1px solid var(--color-gold-accent)`,
            background: locale === 'en' ? 'var(--color-gold-accent)' : 'transparent',
            color: locale === 'en' ? 'white' : 'var(--color-dark)',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          English
        </button>
        <button 
          onClick={() => switchLanguage('pa')}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '4px',
            border: `1px solid var(--color-gold-accent)`,
            background: locale === 'pa' ? 'var(--color-gold-accent)' : 'transparent',
            color: locale === 'pa' ? 'white' : 'var(--color-dark)',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          ਪੰਜਾਬੀ
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginRight: '1rem' }}>
      <button 
        onClick={() => switchLanguage('en')}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          fontWeight: locale === 'en' ? 700 : 400,
          color: locale === 'en' ? 'var(--color-gold-accent)' : 'var(--color-dark)',
          textDecoration: locale === 'en' ? 'underline' : 'none',
          padding: 0
        }}
        aria-label="Switch to English"
      >
        English
      </button>
      <span style={{ color: 'var(--color-gray-medium)' }}>|</span>
      <button 
        onClick={() => switchLanguage('pa')}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          fontWeight: locale === 'pa' ? 700 : 400,
          color: locale === 'pa' ? 'var(--color-gold-accent)' : 'var(--color-dark)',
          textDecoration: locale === 'pa' ? 'underline' : 'none',
          padding: 0,
          fontFamily: locale === 'pa' ? 'inherit' : 'sans-serif'
        }}
        aria-label="ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲੋ"
      >
        ਪੰਜਾਬੀ
      </button>
    </div>
  );
};
