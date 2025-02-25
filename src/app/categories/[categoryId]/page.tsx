import { getCategory } from '@/actions/category'
import { CategoryXWikiNotes } from '@/components/category/CategoryXWikiNotes'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import SectionHeading from '@/components/common/SectionHeading'
import { TagList } from '@/components/tag/TagList'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

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
  const title = category.name
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
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: category?.name, href: `/categories/${categoryId}` }]} />
      <div className="py-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SectionHeading title={t.solve} />
          <TagList categoryId={categoryId} parentTagId={undefined} depth={0} />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionHeading title={t.wiki} />
          <CategoryXWikiNotes categoryId={categoryId} />
        </Suspense>
      </div>
    </Container>
  )
}

export default IssuePages
