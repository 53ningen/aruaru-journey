import { getTag } from '@/actions/tag'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Tag } from '@prisma/client'
import Link from 'next/link'
import { Fragment } from 'react'

type Props = {
  tag: Tag
}

export const IssueTagItem = async ({ tag }: Props) => {
  const tree = await listParents(tag)
  return (
    <div className="flex gap-1 text-sm">
      {tree.map((item, index) => {
        return index === 0 ? (
          <Link key={item.id} href={`/categories/${item.categoryId}#${item.id}`}>
            {item.name}
          </Link>
        ) : (
          <Fragment key={item.id}>
            <span>
              <ChevronRightIcon className="inline h-5 w-5 text-gray-500" />
            </span>

            <Link href={`/categories/${item.categoryId}#${item.id}`}>{item.name}</Link>
          </Fragment>
        )
      })}
    </div>
  )
}

const listParents = async (tag: Tag, tags: Tag[] = []): Promise<Tag[]> => {
  if (!tag.parentId) {
    return [tag, ...tags]
  }
  const parent = await getTag(tag.parentId)
  if (!parent) {
    return [tag, ...tags]
  }
  return listParents(parent, [tag, ...tags])
}
