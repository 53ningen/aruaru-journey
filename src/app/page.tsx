import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import { CategoryList } from '@/components/home/CategoryList'
import { getDictionary } from '@/i18n/dictionaries'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  const { common: t, issue } = await getDictionary()
  return (
    <Container className="max-w-screen-sm px-8 md:px-2">
      <div className="flex flex-col gap-8">
        <div className="py-4 text-xs text-gray-500">{t.desc}</div>
        <div>
          <Title title={t.solve} />
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryList />
          </Suspense>
        </div>
        <div>
          <Title title={t.analyze} />
          <Suspense>
            <div>
              <Link href="/issues">{issue.categorizeIssues}</Link>
            </div>
          </Suspense>
        </div>
      </div>
    </Container>
  )
}
