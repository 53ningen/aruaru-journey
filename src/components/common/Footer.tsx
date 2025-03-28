import { getDictionary } from '@/i18n/dictionaries'
import Link from 'next/link'

const Footer = async () => {
  const { common: t } = await getDictionary()
  return (
    <footer className="grid gap-4 p-32 pb-96 text-center">
      <div className="">
        <Link href="/" className="text-xs text-gray-500">
          {t.title}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
