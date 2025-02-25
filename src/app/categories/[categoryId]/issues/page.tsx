import { getCategory } from '@/actions/category'
import { listIssues } from '@/actions/issue'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import { IssueList } from '@/components/issue/IssueList'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ categoryId: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { categoryId: categoryIdStr } = await params
  const categoryId = parseInt(categoryIdStr)
  if (isNaN(categoryId)) {
    notFound()
  }
  const category = await getCategory(categoryId)
  if (!category) {
    notFound()
  }
  const title = `issues: ${category.name}`
  const meta = await getMetadata(title)
  return meta
}

const IssuePages = async ({ params }: Props) => {
  const { categoryId: categoryIdStr } = await params
  const categoryId = parseInt(categoryIdStr)
  if (isNaN(categoryId)) {
    notFound()
  }
  const category = await getCategory(categoryId)
  if (!category) {
    notFound()
  }
  const { category: t } = await getDictionary()
  const issues = await listIssues(categoryId)
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: category.name }, { name: t.issues, href: `/categories/${categoryId}/issues` }]} />
      <div className="flex flex-col gap-8 py-8">
        <IssueList issues={issues} />
      </div>
    </Container>
  )
}

export default IssuePages
