import { getIssue } from '@/actions/issue'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import SectionHeading from '@/components/common/SectionHeading'
import Title from '@/components/common/Title'
import { CategoryIssueTagEditor } from '@/components/issue/CategoryIssueTagEditor'
import { IssueTagList } from '@/components/issue/IssueTagList'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  params: Promise<{ issueId: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { issueId: issueIdStr } = await params
  const issueId = parseInt(issueIdStr)
  if (isNaN(issueId)) {
    notFound()
  }
  const issue = await getIssue(issueId)
  if (!issue) {
    notFound()
  }

  const title = issue.title
  const meta = await getMetadata(title)
  return meta
}

const IssuePages = async ({ params }: Props) => {
  const { issueId: issueIdStr } = await params
  const issueId = parseInt(issueIdStr)
  if (isNaN(issueId)) {
    notFound()
  }
  const issue = await getIssue(issueId)
  if (!issue) {
    notFound()
  }
  const { issue: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: issue.title, href: `/issues/${issueId}` }]} />
      <Title title={issue.title} />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col text-gray-500">
          <div className="flex gap-2">
            <div>{t.category}:</div>
            <div>{issue.category.name}</div>
          </div>
          <div className="flex gap-2">
            <div>{t.status}:</div>
            <div>{issue.status}</div>
          </div>
          <div className="flex gap-2">
            <div>{t.createdAt}:</div>
            <div>{new Date(issue.createdAt).toISOString()}</div>
          </div>
          <div className="flex gap-2">
            <div>{t.url}:</div>
            <div>
              <a href={issue.url} target="_blank">
                {issue.url}
              </a>
            </div>
          </div>
        </div>
        <div>{issue.note || <span className="text-gray-500">{t.noCaseNote}</span>}</div>
        <div>
          <SectionHeading title="🏷️ Tags" />
          <div className="flex flex-col gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              <IssueTagList issueId={issue.id} />
            </Suspense>
            <Suspense fallback={'Loading...'}>
              <CategoryIssueTagEditor issueId={issue.id} categoryId={issue.categoryId} />
            </Suspense>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default IssuePages
