import { Category } from '@prisma/client'
import { GenericEditor } from '../common/GenericEditor'

type Props = {
  category?: Category
}

export const CategoryForm = async ({ category: givenCategory }: Props) => {
  const category = givenCategory || {
    id: 0,
    name: '',
    displayOrder: 1,
  }
  return <GenericEditor item={category} readOnlyFields={['id']} requiredFields={['id', 'name', 'displayOrder']} />
}
