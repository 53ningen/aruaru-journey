import Container from '@/components/common/Container'
import { getDictionary } from '@/i18n/dictionaries'

export default async function Home() {
  const { common: t } = await getDictionary()
  return (
    <Container className="max-w-screen-sm text-center px-8 md:px-2">
      <div className="py-16 text-xs text-gray-500">{t.desc}</div>
      <div className="px-0 sm:px-8"></div>
    </Container>
  )
}
