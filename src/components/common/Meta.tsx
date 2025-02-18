import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

const getMetadata = async (title?: string, description?: string): Promise<Metadata> => {
  const { common: t } = await getDictionary()
  return {
    title: title ? `${title} - ${t.title}` : t.title,
    description: description || t.desc,
  }
}

export default getMetadata
