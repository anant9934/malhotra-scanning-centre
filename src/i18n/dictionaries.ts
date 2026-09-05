import 'server-only';
import type { Locale } from './config';

// We use a dynamic import pattern to ensure dictionaries are only loaded on demand
const dictionaries = {
  en: () => import('./dictionaries/en').then((module) => module.en),
  pa: () => import('./dictionaries/pa').then((module) => module.pa),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
