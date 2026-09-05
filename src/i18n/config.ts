export const locales = ['en', 'pa'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const i18n = {
  defaultLocale,
  locales,
} as const;
