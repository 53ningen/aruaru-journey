'use client'

import { PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

type Props = {
  tagId: number
}

export const TagEditButton = ({ tagId }: Props) => {
  return (
    <Link href={`/tags/${tagId}`}>
      <PencilIcon width={14} />
    </Link>
  )
}
