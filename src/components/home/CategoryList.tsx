import { listCategories } from '@/actions/category'
import Link from 'next/link'

export const CategoryList = async () => {
  const categories = await listCategories()
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  )
}
