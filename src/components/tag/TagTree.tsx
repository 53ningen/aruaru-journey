import { listChildTags, listParentTags } from '@/actions/tag'
import { getDictionary } from '@/i18n/dictionaries'
import { Tag } from '@prisma/client'
import Link from 'next/link'
import { FaFile, FaFolderOpen } from 'react-icons/fa'
import { FaFolderClosed } from 'react-icons/fa6'
import { MdLibraryAdd } from 'react-icons/md'
import { VscBlank } from 'react-icons/vsc'

type Props = {
  tag: Tag
}

export const TagTree = async ({ tag }: Props) => {
  const parents = await listParentTags(tag)
  const children = await listChildTags(tag.id)
  const { tag: t } = await getDictionary()
  return (
    <div className="flex flex-col gap-1 text-sm">
      {parents.map((item, index) => {
        const currentItem = index === parents.length - 1
        return (
          <div key={item.id} className="flex gap-1 items-center pl-2">
            {Array.from({ length: index }).map((_, i) => (
              <VscBlank key={i} className="w-2" />
            ))}
            <span>{currentItem ? <FaFolderOpen className="text-amber-500" /> : <FaFolderClosed className="text-amber-300" />}</span>
            <Link href={`/tags/${item.id}`} className={`${currentItem && 'text-secondary font-bold'}`}>
              {item.name}
            </Link>
          </div>
        )
      })}
      {children.map((item) => {
        return (
          <div key={item.id} className="flex gap-1 items-center pl-2">
            {Array.from({ length: parents.length }).map((_, i) => (
              <VscBlank key={i} className="w-2" />
            ))}
            <span>
              <FaFile className="text-gray-500" />
            </span>
            <Link href={`/tags/${item.id}`}>{item.name}</Link>
          </div>
        )
      })}
      <div className="flex gap-1 items-center pl-2 text-secondary">
        {Array.from({ length: parents.length }).map((_, i) => (
          <VscBlank key={i} className="w-2" />
        ))}
        <span>
          <MdLibraryAdd />
        </span>
        <Link href={`/tags/${tag.id}/createChild`} className="text-secondary">
          {t.addChild}
        </Link>
      </div>
    </div>
  )
}
