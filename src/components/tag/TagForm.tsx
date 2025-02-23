import { listCategories } from '@/actions/category'
import { getTag } from '@/actions/tag'
import { Tag } from '@prisma/client'
import { GenericEditor } from '../common/GenericEditor'
import Select from '../common/Select'
import TextArea from '../common/TextArea'
import TextField from '../common/TextField'

type Props = {
  tag?: Tag
}

export const TagForm = async ({ tag: givenTag }: Props) => {
  const tag = givenTag || {
    id: 0,
    name: '',
    categoryId: 1,
    displayOrder: 1,
    parentId: null,
    note: null,
  }
  const categories = await listCategories()
  const parentTag = tag.parentId ? await getTag(tag.parentId) : undefined
  const isNew = tag.id === 0
  return (
    <GenericEditor
      item={tag}
      readOnlyFields={['id', 'categoryId']}
      requiredFields={['id', 'name', 'displayOrder']}
      customFields={{
        categoryId: () => (
          <>
            <Select name="categoryId" defaultValue={tag.categoryId} required>
              {categories.map((category) => (
                <option key={category.id} value={category.id} disabled={!isNew && category.id !== tag.categoryId}>
                  {category.name}
                </option>
              ))}
            </Select>
          </>
        ),
        parentId: () => (
          <>
            <TextField name="parentId" type="number" defaultValue={tag.parentId || undefined} />
            {parentTag && <div className="text-right">{parentTag.name}</div>}
          </>
        ),
        note: () => <TextArea name="note" rows={16} key="note" defaultValue={tag.note || undefined} />,
      }}
    />
  )
}
