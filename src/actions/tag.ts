import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
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
  async (categoryId: number, parentId: number | null) =>
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
