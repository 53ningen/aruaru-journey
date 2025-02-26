import { getCategory } from '@/actions/category'
import { listIssuesByTag } from '@/actions/issue'
import { getTag } from '@/actions/tag'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import SectionHeading from '@/components/common/SectionHeading'
import { IssueList } from '@/components/issue/IssueList'
import { TagEditor } from '@/components/tag/TagEditor'
import { TagForm } from '@/components/tag/TagForm'
import { TagTree } from '@/components/tag/TagTree'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ tagId: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { tagId: tagIdStr } = await params
  const tagId = parseInt(tagIdStr)
  if (isNaN(tagId)) {
    notFound()
  }
  const tag = await getTag(tagId)
  if (!tag) {
    notFound()
  }

  const name = tag.name
  const meta = await getMetadata(name)
  return meta
}

const TagPages = async ({ params }: Props) => {
  const { tagId: tagIdStr } = await params
  const tagId = parseInt(tagIdStr)
  if (isNaN(tagId)) {
    notFound()
  }
  const tag = await getTag(tagId)
  if (!tag) {
    notFound()
  }
  const category = await getCategory(tag.categoryId)
  const issues = await listIssuesByTag(tagId)
  const { tag: t, issue: i } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: category!.name, href: `/categories/${tag.categoryId}` }, { name: tag.name }]} />
      <div className="flex flex-col gap-8">
        <div>
          <SectionHeading title={t.tagTree} />
          <TagTree tag={tag} />
        </div>
        <div>
          <SectionHeading title={t.tagDetails} />
          <TagEditor>
            <TagForm tag={tag} />
          </TagEditor>
        </div>
        <div className="flex flex-col">
          <SectionHeading title={t.relatedIssues} />
          {issues.length === 0 ? <>{i.noIssue}</> : <IssueList issues={issues} />}
        </div>
      </div>
    </Container>
  )
}

export default TagPages
