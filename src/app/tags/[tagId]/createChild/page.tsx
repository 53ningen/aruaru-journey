import { getTag } from '@/actions/tag'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import { TagEditor } from '@/components/tag/TagEditor'
import { TagForm } from '@/components/tag/TagForm'
import { getDictionary } from '@/i18n/dictionaries'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ tagId: string }>
}

const CreateTagPage = async ({ params }: Props) => {
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
      <Breadcrumbs items={[{ name: `tag: ${tag.name}`, href: `/tags/${tag.id}` }, { name: t.create }]} />
      <div className="flex flex-col gap-8">
        <TagEditor>
          <TagForm
            tag={{
              id: 0,
              categoryId: tag.categoryId,
              parentId: tag.id,
              name: '',
              displayOrder: 1,
              note: null,
            }}
          />
        </TagEditor>
      </div>
    </Container>
  )
}

export default CreateTagPage
