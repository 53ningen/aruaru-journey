import { listTags } from '@/actions/tag'
import { Tag } from '@prisma/client'
import Link from 'next/link'
import { TagEditButton } from './TagEditButton'
import { TagList } from './TagList'

type Props = {
  tag: Tag
  depth: number
  index: number
}

export const TagItem = async ({ tag, depth }: Props) => {
  const children = await listTags(tag.categoryId, tag.id)
  switch (depth) {
    case 0:
      // category header
      return (
        <div className="pb-8">
          <div id={tag.id.toString()} className="mt-[-52px] pt-[52px] w-0 h-0 -z-50" />
          <div className="flex gap-1 items-baseline pb-2 text-xl font-extrabold">
            <Link href={`/categories/${tag.categoryId}#${tag.id}`} className="text-secondary">
              {tag.name}
            </Link>
            <TagEditButton tagId={tag.id} />
          </div>
          <div className="flex flex-col gap-4 p-4 border rounded shadow-sm bg-white">
            {children.length > 0 && <TagList categoryId={tag.categoryId} parentTagId={tag.id} depth={depth + 1} />}
          </div>
        </div>
      )
    case 1:
      // tag header
      return (
        <div className="flex flex-col pb-8">
          <div id={tag.id.toString()} className="mt-[-52px] pt-[52px] w-0 h-0 -z-50" />
          <div className="flex gap-1 items-baseline pb-2 mb-4 text-xl font-extrabold border-b">
            <Link href={`/categories/${tag.categoryId}#${tag.id}`} className="text-black">
              {tag.name}
            </Link>
            <TagEditButton tagId={tag.id} />
          </div>
          {children.length > 0 && (
            <div>
              <TagList categoryId={tag.categoryId} parentTagId={tag.id} depth={depth + 1} />
            </div>
          )}
        </div>
      )
    case 2:
      return (
        <div className="flex flex-col">
          <div id={tag.id.toString()} className="mt-[-52px] pt-[52px] w-0 h-0 -z-50" />
          <div className="flex gap-1 items-baseline text-lg font-bold">
            <Link href={`/categories/${tag.categoryId}#${tag.id}`} className="text-black">
              {tag.name}
            </Link>
            <TagEditButton tagId={tag.id} />
          </div>
          {children.length > 0 && (
            <div className="pl-4 pb-4">
              <TagList categoryId={tag.categoryId} parentTagId={tag.id} depth={depth + 1} />
            </div>
          )}
        </div>
      )
    default:
      return (
        <div className="flex flex-col gap-1">
          <div id={tag.id.toString()} className="mt-[-52px] pt-[52px] w-0 h-0 -z-50" />
          <div className="flex gap-1 items-baseline text-sm text-gray-500">
            <span>{tag.name}</span>
            <TagEditButton tagId={tag.id} />
          </div>
          {children.length > 0 && (
            <div className="pl-4 pb-4">
              <TagList categoryId={tag.categoryId} parentTagId={tag.id} depth={depth + 1} />
            </div>
          )}
        </div>
      )
  }
}
