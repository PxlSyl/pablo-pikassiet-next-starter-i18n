import { useRef, useState } from 'react'
import { usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation'
import { useOuterClick } from '@/hooks/useOuterclick'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { allBlogs } from '.contentlayer/generated'
import slugMap from 'config/data/localeid-map.json'
import { useRouter } from 'next/navigation'

const LangSwitch = () => {
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const locale = useParams()?.locale as LocaleTypes
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLocaleChange = (newLocale: string): string => {
    const newUrl = `/${newLocale}/${urlSegments.join('/')}`

    if (
      newUrl.startsWith(`/${newLocale}/categories/`) ||
      newUrl.startsWith(`/${newLocale}/tags/`)
    ) {
      return `/${newLocale}/${urlSegments.slice(0, -1).join('/')}`
    }

    const currentPost = allBlogs.find((p) => pathname.includes(p.slug))

    if (currentPost) {
      const newSlug = slugMap[currentPost.localeid]?.[newLocale]

      if (newSlug) {
        return `/${newLocale}/blog/${newSlug}`
      } else {
        return `/${newLocale}/blog`
      }
    }

    return newUrl
  }

  const handleLinkClick = async (newLocale: string) => {
    try {
      const resolvedUrl = await handleLocaleChange(newLocale)
      router.push(resolvedUrl)
    } catch (error) {
      console.error('Error handling locale change:', error)
      // Handle error as needed
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-[#3d3d3d] dark:text-white"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {locale}
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-12 origin-top-right rounded-md border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:rounded-md dark:bg-[#3d3d3d] dark:ring-1 dark:ring-gray-300"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onBlur={closeMenu}
        >
          <ul className="py-1" role="none" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {locales.map((newLocale: string) => (
              <li key={newLocale}>
                <button
                  onClick={() => handleLinkClick(newLocale)}
                  className="px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 dark:bg-[#3d3d3d] dark:text-white dark:hover:bg-[#4e4e4e]"
                  role="menuitem"
                  style={{ display: 'block', width: '100%', textDecoration: 'none' }}
                >
                  {newLocale}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LangSwitch
