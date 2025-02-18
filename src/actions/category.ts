import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const getCategory = unstable_cache(
  async (id: number) =>
    prisma.category.findUnique({
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTags.Category] }
)

export const listCategories = unstable_cache(
  async () =>
    prisma.category.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTags.Category] }
)
