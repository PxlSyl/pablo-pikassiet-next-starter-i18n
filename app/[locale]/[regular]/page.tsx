import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { maintitle } from '@/config/localeMetadata'
import { RegularPage } from '@/types'
import { getSinglePage } from '@/lib/contentParser'

import MDXContent from '@/components/helpers/MDXContent'
import PageHeader from '@/components/partials/PageHeader'

import { LocaleTypes } from '../i18n/settings'

type PageProps = {
  params: { regular: string; locale: LocaleTypes }
}

export async function generateMetadata({
  params: { regular, locale },
}: PageProps): Promise<Metadata | undefined> {
  const regularData = getSinglePage('pages', locale)
  const data = regularData.filter((page: RegularPage) => page.slug === regular)[0]
  const { frontmatter } = data
  const { title, description, image } = frontmatter

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: './',
      siteName: maintitle[locale],
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    twitter: {
      title: title,
      description: description,
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
  }
}

// remove dynamicParams
export const dynamicParams = false

// generate static params
export const generateStaticParams = ({ params: { locale } }: PageProps) => {
  const getRegularPages = getSinglePage('pages', locale)

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }))

  return regularPages
}

// for all regular pages
const RegularPages = ({ params: { regular, locale } }: PageProps) => {
  const regularData = getSinglePage('pages', locale)
  const data = regularData.filter((page: RegularPage) => page.slug === regular)[0]
  const { frontmatter, content } = data
  const { title } = frontmatter

  return (
    <>
      <PageHeader title={title} />
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
    </>
  )
}

export default RegularPages
