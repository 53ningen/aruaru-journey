'use server'

import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { revalidateTag, unstable_cache } from 'next/cache'

export const listIssueTags = unstable_cache(
  async (issueId: number) =>
    prisma.issueTag
      .findMany({
        select: {
          tag: true,
        },
        where: {
          issueId,
        },
      })
      .then((it) => it.map((it) => it.tag)),
  undefined,
  { tags: [CacheTags.IssueTag] }
)

type FormActionState = { message?: string; error?: string }

export const putIssueTag = async (issueId: number, tagId: number): Promise<FormActionState> => {
  try {
    await prisma.$transaction(async (tx) => {
      const exist = await tx.issueTag.findFirst({
        where: {
          issueId,
          tagId,
        },
      })
      if (exist) {
        throw new Error('Already exists')
      }
      await tx.issueTag.create({
        data: {
          issueId,
          tagId,
        },
      })
    })
    revalidateTag(CacheTags.IssueTag)
    return { message: 'Success' }
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    } else {
      return { error: 'Unknown error' }
    }
  }
}

export const deleteIssueTag = async (issueId: number, tagId: number): Promise<FormActionState> => {
  try {
    await prisma.issueTag.deleteMany({
      where: {
        issueId,
        tagId,
      },
    })
    revalidateTag(CacheTags.IssueTag)
    return { message: 'Success' }
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    } else {
      return { error: 'Unknown error' }
    }
  }
}
