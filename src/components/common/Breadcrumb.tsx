import Link from 'next/link'

interface Props {
  item: { name: string; href?: string }
}

const Breadcrumb = ({ item }: Props) =>
  item.href ? (
    <Link href={item.href} className="inline text-primary text-sm font-semibold">
      {item.name}
    </Link>
  ) : (
    <span className="inline text-gray-500 text-sm font-semibold">{item.name}</span>
  )

export default Breadcrumb
