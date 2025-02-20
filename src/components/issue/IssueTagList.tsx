import { listIssueTags } from '@/actions/issueTag'
import { Tag } from '@prisma/client'
import { IssueTagItem } from './IssueTagItem'

type Props = {
  issueId: number
}

export const IssueTagList = async ({ issueId }: Props) => {
  const tags: Tag[] = await listIssueTags(issueId)
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
        <IssueTagItem key={tag.id} issueId={issueId} tag={tag} />
      ))}
    </div>
  )
}
