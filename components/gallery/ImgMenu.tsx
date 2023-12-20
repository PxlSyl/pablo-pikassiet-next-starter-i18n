'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'

const menuItems = [
  { path: '/drawings', labelKey: 'Artbookheader:Drawings' },
  { path: '/pixelartbook', labelKey: 'Artbookheader:PixelArt' },
  { path: '/games', labelKey: 'Artbookheader:Game' },
  { path: '/web3', labelKey: 'Artbookheader:Web3' },
]

export const ImgMenu: React.FC = (): JSX.Element => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container">
        <div className="texttitle font-nothing">Gallery</div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center rounded-lg bg-opacity-20 bg-cover bg-center p-6 text-center shadow-lg">
        <div className="m-2 grid grid-cols-2 p-2 lg:grid-cols-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <button
                className={`m-2 rounded-md bg-[#00000020] px-4 py-2 font-semibold shadow-md transition duration-100 ease-in-out hover:text-blue-300 ${
                  router.asPath === item.path ? 'text-blue-400' : 'text-white'
                }`}
              >
                {item.labelKey}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
