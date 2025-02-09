import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import { getDictionary } from '@/i18n/dictionaries'

interface Props {
  params: Promise<{ page: string }>
}

const IssuePages = async ({ params }: Props) => {
  const { page } = await params
  const { common: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs
        items={[
          { name: t.title, href: '/issues' },
          { name: `page: ${page}`, href: `/issues/pages/${page}` },
        ]}
      />
      <Title title={t.title} />
      <div className="flex flex-col gap-8"></div>
    </Container>
  )
}

export default IssuePages
