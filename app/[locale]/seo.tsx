import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { maintitle, maindescription } from '@/config/localeMetadata'
import { LocaleTypes } from './i18n/settings'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  params: { locale: LocaleTypes }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  params: { locale },
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${maintitle[locale]}`,
      description: description ? description : maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${maintitle[locale]}`,
      description: description ? description : maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
