import { listIssues } from '@/actions/issue'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import { IssueList } from '@/components/issue/IssueList'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { issue: t } = await getDictionary()
  const title = t.categorizeIssues
  const meta = await getMetadata(title)
  return meta
}

const Issues = async () => {
  const { issue: t } = await getDictionary()
  const issues = await listIssues()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.categorizeIssues, href: '/issues' }]} />
      <div className="flex flex-col gap-8 py-8">
        <IssueList issues={issues} />
      </div>
    </Container>
  )
}

export default Issues
