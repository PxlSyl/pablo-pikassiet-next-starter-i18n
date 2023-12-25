'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { humanize } from '@/lib/utils/textConverter'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { useTranslation } from '@/app/[locale]/i18n/client'

// Helper function to get translated label for specific path segments
const getTranslatedLabel = (label: string, t: any) => {
  // Add more cases for different path segments
  switch (label) {
    case 'authors':
      return t('authors')
    case 'categories':
      return t('categories')
    case 'tags':
      return t('tags')
    case 'prints':
      return t('prints')
    case 'commissions':
      return t('commissions')
    case 'drawings':
      return t('drawings')
    case 'photography':
      return t('photography')
    case 'projects':
      return t('projects')
    case 'music':
      return t('music')
    case 'musicinfos':
      return t('musicinfos')
    case 'shop-infos':
      return t('shopinfos')
    case 'about':
      return t('about')
    case 'terms':
      return t('terms')
    case 'legal-notice':
      return t('legalnotice')
    default:
      return humanize(label.replace(/[-_]/g, ' ')) || ''
  }
}

const Breadcrumbs = ({ className, element }: { className?: string; element?: string }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'headerlinks')
  const pathname = usePathname()

  const paths = pathname.split('/').filter((x) => x)
  const parts = [
    {
      label: t('home'),
      href: '/',
      'aria-label': pathname === '/' ? 'page' : undefined,
    },
  ]

  paths.forEach((label: string, i: number) => {
    const href = `/${paths.slice(0, i + 1).join('/')}`
    label !== 'page' &&
      parts.push({
        label: getTranslatedLabel(label, t),
        href,
        'aria-label': pathname === href ? 'page' : undefined,
      })
  })

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="inline-flex">
        {parts.map(({ label, ...attrs }, index) => (
          <li className="mx-1 capitalize" key={index}>
            {index > 0 && <span className="mr-1 inline-block">/</span>}
            {index !== parts.length - 1 ? (
              <Link className="text-primary dark:text-darkmode-primary" {...attrs}>
                {label}
              </Link>
            ) : (
              <span className="text-light dark:text-darkmode-light">{label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
