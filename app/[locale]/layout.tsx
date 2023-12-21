import '@/styles/main.scss'
import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { maintitle, maindescription } from '@/config/localeMetadata'
import theme from '@/config/theme.json'

import TwSizeIndicator from '@/components/helpers/TwSizeIndicator'
import Footer from '@/components/navigation/footer/Footer'
import { Header } from '@/components/navigation/menu'
import { SearchProvider } from '@/components/navigation/search/SearchProvider'
import Providers from '@/components/partials/Providers'
import { dir } from 'i18next'
import { LocaleTypes, locales } from './i18n/settings'

type PageProps = {
  children: React.ReactNode
  params: { locale: LocaleTypes }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: maintitle[locale],
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
  }
}

export default function RootLayout({ children, params: { locale } }: PageProps) {
  // import google font css
  const pf = theme.fonts.font_family.primary
  const sf = theme.fonts.font_family.secondary

  return (
    <html suppressHydrationWarning={true} lang={locale} dir={dir(locale)}>
      <head>
        {/* responsive meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* favicon */}
        <link rel="shortcut icon" href={siteMetadata.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="nextplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />

        {/* google font css */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? '&family=' + sf : ''
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Providers>
          <SearchProvider>
            <Header />
            <main>{children}</main>
          </SearchProvider>
          <Footer params={{ locale: locale }} />
        </Providers>
      </body>
    </html>
  )
}
