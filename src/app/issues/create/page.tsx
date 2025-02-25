import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import IssuesForm from '@/components/issue/IssuesForm'
import { getDictionary } from '@/i18n/dictionaries'

const CreateIssuePage = async () => {
  const { common: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.createIssues }]} />
      <IssuesForm />
    </Container>
  )
}

export default CreateIssuePage
