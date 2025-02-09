export type Locale = (typeof locales)[number]

export const locales = ['en'] as const
export const localeLabels = [{ emoji: '🇬🇧', label: 'English' }] as const

export const defaultLocale: Locale = 'en'

export const currentLocale = (process.env.NEXT_PUBLIC_LANG || defaultLocale) as Locale

export const isDefaultLocale = currentLocale === defaultLocale
