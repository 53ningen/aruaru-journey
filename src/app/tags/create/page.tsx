import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import { TagEditor } from '@/components/tag/TagEditor'
import { TagForm } from '@/components/tag/TagForm'
import { getDictionary } from '@/i18n/dictionaries'

const CreateTagPage = async () => {
  const { tag: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.create }]} />
      <div className="flex flex-col gap-8">
        <TagEditor>
          <TagForm />
        </TagEditor>
      </div>
    </Container>
  )
}

export default CreateTagPage
