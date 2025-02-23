'use server'

import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const getIssue = unstable_cache(
  async (id: number) =>
    prisma.issue.findUnique({
      include: {
        category: true,
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
      orderBy: {
        createdAt: 'desc',
      },
      take: 200,
    }),
  undefined,
  { tags: [CacheTags.Issue] }
)

export const listIssuesByTag = unstable_cache(
  async (tagId: number) =>
    prisma.issueTag
      .findMany({
        select: {
          issue: {
            include: {
              category: true,
            },
          },
        },
        where: {
          tagId,
        },
        take: 50,
      })
      .then((items) => items.map((item) => item.issue)),
  undefined,
  { tags: [CacheTags.IssueTag] }
)
