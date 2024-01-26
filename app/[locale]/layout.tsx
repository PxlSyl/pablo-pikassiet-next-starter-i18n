import '@/styles/main.scss'
import { Signika, Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { maintitle, maindescription } from '@/config/localeMetadata'

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

const signika = Signika({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-signika',
})

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

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
  return (
    <html
      suppressHydrationWarning={true}
      lang={locale}
      className={`${signika.variable} ${space_grotesk.variable} scroll-smooth`}
      dir={dir(locale)}
    >
      <head>
        {/* responsive meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* favicons */}
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        {/* theme meta */}
        <meta name="theme-name" content="pablo pikassiet" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>

      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Providers>
          <SearchProvider>
            <Header />
            <main>{children}</main>
          </SearchProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
