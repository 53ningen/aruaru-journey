'use server'

import { FormState } from '@/components/common/GenericEditor'
import { CacheTags } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'

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

export const upsertCategory = async (_: FormState, formData: FormData): Promise<FormState> => {
  const id = parseInt(formData.get('id') as string)
  if (isNaN(id)) {
    return { error: 'Invalid ID' }
  }
  const data: Omit<Category, 'id'> = {
    name: formData.get('name') as string,
    displayOrder: parseInt(formData.get('displayOrder') as string),
  }
  try {
    if (id === 0) {
      await prisma.category.create({ data })
      revalidateTag(CacheTags.Category)
      return { message: 'Create Successful' }
    } else {
      await prisma.category.update({
        data,
        where: { id },
      })
      revalidateTag(CacheTags.Category)
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
