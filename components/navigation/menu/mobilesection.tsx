'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { selectedClass, hoverClass } from './menutheme'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

interface SectionProps {
  icon: React.ReactNode
  title: string
  links: { title: string; href?: string }[]
  closeMenu: () => void
}

export const Mobilesection = ({ icon, title, links, closeMenu }: SectionProps) => {
  const pathname = usePathname()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'headerlinks')
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton
          className={`mb-1 ml-4 flex flex-row items-center border-b border-t border-gray-500 text-2xl hover:text-blue-300 ${hoverClass}`}
        >
          {icon}
          <p className="ml-1">{title}</p>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        {links.map((link) => {
          if (link.href) {
            const isSelected = pathname.includes(link.href as string)
            return (
              <Link
                key={link.title}
                href={link.href.startsWith('http') ? link.href : `/${locale}${t(`${link.href}`)}`}
                onClick={closeMenu}
                className={`ml-8 flex flex-col font-medium ${hoverClass}
                 ${isSelected ? selectedClass : ''}`}
              >
                {t(`${link.title.toLowerCase()}`)}
              </Link>
            )
          }
          return null
        })}
      </AccordionItemPanel>
    </AccordionItem>
  )
}
