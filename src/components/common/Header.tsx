import { getDictionary } from '@/i18n/dictionaries'
import Image from 'next/image'
import Link from 'next/link'

const Header = async () => {
  const { common } = await getDictionary()
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-2 bg-secondary">
        <div className="grid grid-cols-3">
          <div />
          <div className="flex justify-center items-center">
            <Link href="/">
              <Image src="/logo.png" alt={common.title} width={100} height={23} priority={true} />
            </Link>
          </div>
        </div>
      </header>
      <div className="h-20 w-full" />
    </>
  )
}

export default Header
