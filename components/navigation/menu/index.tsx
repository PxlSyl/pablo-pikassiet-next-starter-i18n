'use client'
// css and third party libraries
import styles from './menu.module.css'
import 'react-accessible-accordion/dist/fancy-example.css'
import { Accordion } from 'react-accessible-accordion'
import { FaHome } from 'react-icons/fa'
import { FaShop, FaRegNoteSticky, FaPalette, FaMusic, FaBlogger } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'
import Logo from '@/components/blog/Logo'
import { selectedClass, hoverClass } from './menutheme'
// utility and hooks
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useDarkMode } from '@/hooks/useDarkmode'
import { useOuterClick } from '@/hooks/useOuterclick'
import { useContactModal } from '@/components/navigation/contact/store'
import { ContactModal } from '@/components/navigation/contact'
// custom components
import LangSwitch from '../lang/LangSwitch'
import ThemeSwitcher from '../theme'
import SearchButton from '../search/SearchButton'
import { Mobilesection } from './mobilesection'
import { Regularsection } from './regularsection'
import Social from '@/components/blog/Social'
// config
import social from '@/config/social.json'
import {
  headerShopLinks,
  headerProjectsLinks,
  headerArtLinks,
  headerMusicLinks,
  headerBlogLinks,
  headerInfosLinks,
} from '@/config/headerLinks'

import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

export const Header: React.FC = (): JSX.Element | null => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'headerlinks')
  const pathname = usePathname()

  const [menuclick, setClick] = useState<boolean>(false)
  const handleClick = (): void => setClick(!menuclick)
  const closeMenu = (): void => setClick(false)
  const menubarRef = useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, closeMenu)

  const contactModal = useContactModal()

  const handleContactClick = (): void => {
    contactModal.onOpen()
  }
  function ContactClick(): void {
    handleContactClick()
  }

  const { theme, mounted } = useDarkMode()

  if (!mounted) return null

  const menuClass =
    theme === 'light'
      ? `${menuclick ? styles.toggle2 : styles.toggle}`
      : `${menuclick ? styles.toggledark2 : styles.toggledark}`

  const handleMenuKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }

  return (
    <div ref={menubarRef}>
      <div
        className={`${menuClass}`}
        onClick={handleClick}
        onKeyDown={handleMenuKeyPress}
        role="button"
        tabIndex={0}
      >
        <div></div>
      </div>
      <div className="fixed left-[80px] top-[22px] z-40">
        <LangSwitch />
      </div>
      <div className="bg-gradient fixed top-0 z-20 h-20 w-full">
        <nav className="mx-auto mt-3 flex max-w-7xl items-center justify-center space-x-4 px-4 sm:space-x-8">
          <div className="flex items-center space-x-2 xl:space-x-4">
            <div className="hidden lg:block">
              <Logo />
            </div>
          </div>
          <div className="hidden lg:block">
            <Social source={social.main} className="social-icons" />
          </div>
          <div className="hidden lg:flex">|</div>
          <div className="hidden lg:flex">
            <IoIosMail
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
              onClick={ContactClick}
            />
          </div>
        </nav>
        <div className="z-40">
          <SearchButton className="fixed right-[70px] top-[34px] mr-5" />
          <ThemeSwitcher className="fixed right-[20px] top-[34px] h-6 w-12 cursor-pointer opacity-100" />
        </div>
      </div>
      <div
        className={`${
          menuclick ? styles.navmenuactive : styles.navmenu
        } bg-gradient overflow-y-auto`}
      >
        <div className=" lg:mx-auto">
          <Link
            className={`mb-2 ml-2 mt-2 flex flex-row items-center text-2xl lg:hidden ${hoverClass}`}
            href="/"
            onClick={closeMenu}
          >
            <FaHome />
            <p className="ml-1">Home</p>
          </Link>
          <div className="lg:flex lg:flex-row">
            <Accordion allowZeroExpanded className="lg:hidden">
              <Mobilesection
                title="Shop"
                links={headerShopLinks}
                icon={<FaShop />}
                closeMenu={closeMenu}
              />
              <Mobilesection
                title="Gallery"
                links={headerArtLinks}
                icon={<FaPalette />}
                closeMenu={closeMenu}
              />
              <Mobilesection
                title="Music"
                links={headerMusicLinks}
                icon={<FaMusic />}
                closeMenu={closeMenu}
              />
              <Mobilesection
                title="Blog"
                links={headerBlogLinks}
                icon={<FaBlogger />}
                closeMenu={closeMenu}
              />
            </Accordion>
            <div className="hidden lg:grid lg:grid-cols-4 lg:justify-center lg:gap-4">
              <Regularsection
                title="Shop"
                links={headerShopLinks}
                icon={<FaShop />}
                closeMenu={closeMenu}
              />
              <Regularsection
                title="Gallery"
                links={headerArtLinks}
                icon={<FaPalette />}
                closeMenu={closeMenu}
              />
              <Regularsection
                title="Music"
                links={headerMusicLinks}
                icon={<FaMusic />}
                closeMenu={closeMenu}
              />
              <Regularsection
                title="Blog"
                links={headerBlogLinks}
                icon={<FaBlogger />}
                closeMenu={closeMenu}
              />
            </div>
            <div className="mt-4 lg:mt-6 xl:ml-4">
              {headerInfosLinks.map((link) => {
                const isSelected = pathname.includes(link.href)
                return (
                  <Link
                    key={link.title}
                    href={`/${locale}${t(`${link.href}`)}`}
                    onClick={closeMenu}
                    className={`ml-4 flex cursor-pointer flex-col text-sm text-gray-900 underline dark:text-gray-100 ${hoverClass} 
                     ${isSelected ? selectedClass : ''}`}
                  >
                    {t(`${link.title.toLowerCase()}`)}
                  </Link>
                )
              })}
              <div
                className={`ml-4 mt-2 flex cursor-pointer flex-col text-sm underline hover:underline ${hoverClass} `}
                onClick={ContactClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    ContactClick()
                  }
                }}
                role="button"
                tabIndex={0}
              >
                Contact
              </div>
            </div>
          </div>
          <div className="lg:hidden"></div>
        </div>
      </div>
      <ContactModal />
    </div>
  )
}
