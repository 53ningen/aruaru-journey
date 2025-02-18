import { Tag } from '@prisma/client'
import { IssueTagItem } from './IssueTagItem'

type Props = {
  tags: Tag[]
}

export const IssueTagList = ({ tags }: Props) => {
  const parents: Tag[] = []
  tags.forEach((tag) => {
    if (tag.parentId) {
      const parent = tags.find((it) => it.id === tag.parentId)
      if (parent) {
        parents.push(parent)
      }
    }
  })
  return (
    <div>
      {tags.map((tag) => (
        <IssueTagItem key={tag.id} tag={tag} />
      ))}
    </div>
  )
}
