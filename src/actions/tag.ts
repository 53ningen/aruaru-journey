'use server'

import { FormState } from '@/components/common/GenericEditor'
import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { sanitizeNumberString, sanitizeString } from '@/lib/sanitize'
import { Tag } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'

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

export const upsertTag = async (_: FormState, formData: FormData): Promise<FormState> => {
  const id = parseInt(formData.get('id') as string)
  if (isNaN(id)) {
    return { error: 'Invalid ID' }
  }
  const data: Omit<Tag, 'id'> = {
    name: formData.get('name') as string,
    categoryId: parseInt(formData.get('categoryId') as string),
    parentId: sanitizeNumberString(formData.get('parentId') as string),
    displayOrder: parseInt(formData.get('displayOrder') as string),
    note: sanitizeString(formData.get('note') as string),
  }
  try {
    if (id === 0) {
      await prisma.tag.create({ data })
      revalidateTag(CacheTags.Tag)
      return { message: 'Create Successful' }
    } else {
      await prisma.tag.update({
        data,
        where: { id },
      })
      revalidateTag(CacheTags.Tag)
      return { message: 'Update Successful' }
    }
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    } else {
      return { error: 'Unknown Error' }
    }
  }
}
