import { listChildTags, listTags } from '@/actions/tag'
import mdast2xwiki from '@/lib/mdast2xwiki'
import { Tag } from '@prisma/client'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import TextArea from '../common/TextArea'

type Props = {
  categoryId: number
}

export const CategoryXWikiNotes = async ({ categoryId }: Props) => {
  const tags = await listTags(categoryId)
  let xwiki = ''
  for (const tag of tags) {
    xwiki += (await generateXWikiNote(tag, 1)) + '\n'
  }
  return <TextArea rows={24} defaultValue={xwiki} className="w-full text-xs" />
}

const generateXWikiNote = async (tag: Tag, depth: number) => {
  let xwiki = '='.repeat(depth) + ' ' + tag.name + ` {{id name="${tag.id}"/}} ` + '='.repeat(depth) + '\n\n'
  if (tag.note) {
    xwiki += String(await unified().use(remarkParse).use(mdast2xwiki).process(tag.note))
  }
  const children = await listChildTags(tag.id)
  if (children.length > 0) {
    for (const child of children) {
      xwiki += await generateXWikiNote(child, depth + 1)
    }
  }
  return xwiki
}
