import { listTags } from '@/actions/tag'
import { TagItem } from './TagItem'

interface Props {
  categoryId: number
  parentTagId?: number
  depth: number
}

export const TagList = async ({ categoryId, parentTagId, depth }: Props) => {
  const tags = await listTags(categoryId, parentTagId || null)
  return (
    <div className="flex flex-col">
      {tags.map((tag, index) => (
        <TagItem key={tag.id} tag={tag} depth={depth} index={index} />
      ))}
    </div>
  )
}
