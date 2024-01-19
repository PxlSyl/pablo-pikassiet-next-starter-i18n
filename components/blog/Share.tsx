'use client'

import siteMetadata from '@/config/siteMetadata'
import { Facebook, Linkedin, Pinterest, Twitter, Whatsapp, Telegram } from '../navigation/icons'
import { useParams, usePathname } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import { fallbackLng, secondLng } from '@/app/[locale]/i18n/locales'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

type ShareProps = { title: string; description?: string; slug: string; className?: string }

const Share = ({ title, description, slug, className }: ShareProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'elements')
  const pathname = usePathname()
  const pathSegments = pathname.split('/')

  // Choose the appropriate segment based on the locale
  let targetSegment = pathSegments.length >= 2 ? pathSegments[1] : ''

  if (locale === fallbackLng) {
    // If locale is fallbackLng, use the second segment
    targetSegment = pathSegments.length >= 2 ? pathSegments[1] : ''
  } else if (locale === secondLng) {
    // If locale is secondLng, use the third segment
    targetSegment = pathSegments.length >= 3 ? pathSegments[2] : ''
  }

  return (
    <div className="m-4 mt-8 flex items-center justify-center">
      <h5 className="mr-3 text-highlighted dark:text-darkmode-highlighted">{t('share')}</h5>
      <ul className={className}>
        <li className="inline-block">
          <a
            aria-label={t('facebookshare')}
            href={`https://facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Facebook />
          </a>
        </li>
        <li className="inline-block">
          <a
            aria-label={t('twittershare')}
            href={`https://twitter.com/intent/tweet/?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Twitter />
          </a>
        </li>
        <li className="inline-block">
          <a
            aria-label={t('linkedinshare')}
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&title=${title}&summary=${description}&source=${siteMetadata.base_url}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Linkedin />
          </a>
        </li>
        <li className="inline-block">
          <a
            aria-label={t('pinterestshare')}
            href={`https://pinterest.com/pin/create/button/?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&media=&description=${description}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Pinterest />
          </a>
        </li>
        <li className="inline-block">
          <a
            aria-label={t('whatsappshareshare')}
            href={`https://wa.me/?text=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Whatsapp />
          </a>
        </li>
        <li className="inline-block">
          <a
            aria-label={t('telegramshare')}
            href={`https://telegram.me/share/url?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Telegram />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Share
