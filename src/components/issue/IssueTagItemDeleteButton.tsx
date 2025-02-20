'use client'

import { deleteIssueTag } from '@/actions/issueTag'
import { TrashIcon } from '@heroicons/react/24/solid'

export const IssueTagItemDeleteButton = ({ issueId, tagId }: { issueId: number; tagId: number }) => {
  return (
    <button onClick={() => deleteIssueTag(issueId, tagId)}>
      <TrashIcon width={16} />
    </button>
  )
}
