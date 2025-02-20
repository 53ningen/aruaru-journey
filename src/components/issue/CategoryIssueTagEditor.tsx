import { listAllTags } from '@/actions/tag'
import { IssueTagEditor } from './IssueTagEditor'

type Props = {
  issueId: number
  categoryId: number
}

export const CategoryIssueTagEditor = async ({ issueId, categoryId }: Props) => {
  const tags = await listAllTags(categoryId)
  return <IssueTagEditor issueId={issueId} tags={tags} />
}
