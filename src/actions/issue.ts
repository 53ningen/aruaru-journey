import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const getIssue = unstable_cache(
  async (id: number) =>
    prisma.issue.findUnique({
      include: {
        category: true,
        issueTags: {
          include: {
            tag: true,
          },
        },
      },
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTags.Issue] }
)

export const listIssues = unstable_cache(
  async () =>
    prisma.issue.findMany({
      include: {
        category: true,
      },
    }),
  undefined,
  { tags: [CacheTags.Issue] }
)
