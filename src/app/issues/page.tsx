import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import { getDictionary } from '@/i18n/dictionaries'

const Issues = async () => {
  const { common: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.title, href: '/issues' }]} />
      <Title title={t.title} />
      <div className="flex flex-col gap-8"></div>
    </Container>
  )
}

export default Issues
