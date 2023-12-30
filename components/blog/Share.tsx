'use client'

import siteMetadata from '@/config/siteMetadata'
import {
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
} from 'react-icons/io5/index.js'
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
    <ul className={className}>
      <li className="inline-block">
        <a
          aria-label={t('facebookshare')}
          href={`https://facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoFacebook />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label={t('twittershare')}
          href={`https://twitter.com/intent/tweet/?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoTwitter />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label={t('linkedinshare')}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&title=${title}&summary=${description}&source=${siteMetadata.base_url}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoLinkedin />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label={t('pinterestshare')}
          href={`https://pinterest.com/pin/create/button/?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&media=&description=${description}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoPinterest />
        </a>
      </li>
    </ul>
  )
}

export default Share
