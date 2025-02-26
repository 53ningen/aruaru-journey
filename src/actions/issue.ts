'use server'

import { FormState } from '@/components/common/GenericEditor'
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
  async (categoryId?: number) =>
    prisma.issue.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        categoryId,
        status: {
          not: 'RESOLVED',
        },
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

export const insertBlukIssues = async (_: FormState, formData: FormData): Promise<FormState> => {
  const csv = formData.get('csv') as string
  const issues = csv
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split('\t'))
    .map(([title, url, categoryId, createdAt]) => ({
      title,
      url,
      categoryId: parseInt(categoryId),
      createdAt: new Date(createdAt.replace('T', ' ').replace('Z', '').slice(0, 19)),
    }))
  try {
    await prisma.issue.createMany({
      data: issues,
    })
    return { message: 'Create Successful' }
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    } else {
      return { error: 'Unknown Error' }
    }
  }
}
