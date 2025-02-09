import { currentLocale, Locale } from './config'

const dictionaries = {
  ja: () => import('./en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale = currentLocale) => dictionaries[locale]?.() ?? dictionaries.ja()
