import { getTag } from '@/actions/tag'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import SectionHeading from '@/components/common/SectionHeading'
import { TagAncestorTree } from '@/components/tag/TagAncestorTree'
import { TagForm } from '@/components/tag/TagForm'
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

const IssuePages = async ({ params }: Props) => {
  const { tagId: tagIdStr } = await params
  const tagId = parseInt(tagIdStr)
  if (isNaN(tagId)) {
    notFound()
  }
  const tag = await getTag(tagId)
  if (!tag) {
    notFound()
  }
  const { tag: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.tagDetails }, { name: tag.name, href: `/tags/${tagId}` }]} />
      <div className="flex flex-col gap-8">
        <div>
          <SectionHeading title={t.tagTree} />
          <TagAncestorTree tag={tag} />
        </div>
        <div>
          <SectionHeading title={t.tagDetails} />
          <TagForm tag={tag} />
        </div>
      </div>
    </Container>
  )
}

export default IssuePages
