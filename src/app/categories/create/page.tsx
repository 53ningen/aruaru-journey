import { CategoryEditor } from '@/components/category/CategoryEditor'
import { CategoryForm } from '@/components/category/CategoryForm'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import { getDictionary } from '@/i18n/dictionaries'

const CreateCategoryPage = async () => {
  const { category: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.create }]} />
      <div className="flex flex-col gap-8">
        <CategoryEditor>
          <CategoryForm />
        </CategoryEditor>
      </div>
    </Container>
  )
}

export default CreateCategoryPage
