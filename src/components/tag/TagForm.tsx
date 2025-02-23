import { getCategory } from '@/actions/category'
import { getTag } from '@/actions/tag'
import { Tag } from '@prisma/client'
import { GenericEditor } from '../common/GenericEditor'
import TextArea from '../common/TextArea'
import TextField from '../common/TextField'

type Props = {
  tag: Tag
}

export const TagForm = async ({ tag }: Props) => {
  const categaory = await getCategory(tag.categoryId)
  const parentTag = tag.parentId ? await getTag(tag.parentId) : undefined
  return (
    <GenericEditor
      item={tag}
      readOnlyFields={['id', 'categoryId']}
      requiredFields={['id', 'name', 'categoryId', 'displayOrder']}
      customFields={{
        categoryId: () => (
          <>
            <TextField type="number" defaultValue={tag.categoryId} readOnly required />
            <div className="text-right">{categaory?.name}</div>
          </>
        ),
        parentId: () => (
          <>
            <TextField type="number" defaultValue={tag.parentId || undefined} />
            {parentTag && <div className="text-right">{parentTag.name}</div>}
          </>
        ),
        note: () => <TextArea rows={16} key="note" defaultValue={tag.note || undefined} />,
      }}
    />
  )
}
