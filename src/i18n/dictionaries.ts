import { currentLocale, Locale } from './config'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale = currentLocale) => dictionaries[locale]?.() ?? dictionaries.en()
