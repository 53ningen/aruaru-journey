import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { currentLocale, defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { DictionaryProvider } from '@/i18n/hook'
import { ReactNode } from 'react'
import './globals.css'

export async function generateMetadata() {
  const { common } = await getDictionary()
  const { title, desc } = common
  return {
    title,
    description: desc,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: './logo.png',
    },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const d = await getDictionary(defaultLocale)
  return (
    <html lang={currentLocale}>
      <DictionaryProvider dictionary={d}>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </DictionaryProvider>
    </html>
  )
}
