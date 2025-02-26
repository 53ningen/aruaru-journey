import { getCategory } from '@/actions/category'
import { CategoryXWikiNotes } from '@/components/category/CategoryXWikiNotes'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import SectionHeading from '@/components/common/SectionHeading'
import { TagList } from '@/components/tag/TagList'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import Link from 'next/link'
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
      <Breadcrumbs items={[{ name: category?.name, href: `/categories/${categoryId}` }]} />{' '}
      <div className="flex flex-col gap-8 py-8">
        <div>
          <ul className="list-disc list-inside">
            <li>
              <Link href={`/categories/${categoryId}/issues`}>{t.issues}</Link>
            </li>
            <li>
              <Link href={`/categories/${categoryId}#tags`}>{t.solve}</Link>
            </li>
            <li>
              <Link href={`/categories/${categoryId}#wiki`}>{t.wiki}</Link>
            </li>
          </ul>
        </div>
        <div id="tags">
          <SectionHeading title={t.solve} />
          <TagList categoryId={categoryId} parentTagId={undefined} depth={0} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div id="wiki">
            <SectionHeading title={t.wiki} />
            <CategoryXWikiNotes categoryId={categoryId} />
          </div>
        </Suspense>
      </div>
    </Container>
  )
}

export default IssuePages
