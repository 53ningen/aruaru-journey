import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { Tag } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export const getTag = unstable_cache(
  async (id: number) =>
    prisma.tag.findUnique({
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTags.Tag] }
)

export const listTags = unstable_cache(
  async (categoryId: number, parentId: number | null = null) =>
    prisma.tag.findMany({
      where: {
        categoryId,
        parentId,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTags.Tag] }
)

export const listChildTags = unstable_cache(
  async (parentId: number) =>
    prisma.tag.findMany({
      where: {
        parentId,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTags.Tag] }
)

export const listParentTags = async (tag: Tag, tags: Tag[] = []): Promise<Tag[]> => {
  if (!tag.parentId) {
    return [tag, ...tags]
  }
  const parent = await getTag(tag.parentId)
  if (!parent) {
    return [tag, ...tags]
  }
  return listParentTags(parent, [tag, ...tags])
}

export const listAllTags = unstable_cache(
  async (categoryId: number) =>
    prisma.tag.findMany({
      where: { categoryId },
      orderBy: {
        displayOrder: 'asc',
      },
    }),
  undefined,
  {
    tags: [CacheTags.Tag],
  }
)
