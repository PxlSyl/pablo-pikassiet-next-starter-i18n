import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { RegularPage } from '@/types'
import { getSinglePage } from '@/lib/contentParser'

import MDXContent from '@/components/helpers/MDXContent'
import PageHeader from '@/components/partials/PageHeader'

import { LocaleTypes } from '../i18n/settings'

export async function generateMetadata({
  params,
}: {
  params: { regular: string; locale: LocaleTypes }
}): Promise<Metadata | undefined> {
  const regularData = getSinglePage('pages', params.locale)
  const data = regularData.filter((page: RegularPage) => page.slug === params.regular)[0]
  const { frontmatter } = data
  const { title, description, image } = frontmatter

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: siteMetadata.title,
      locale: params.locale,
      type: 'website',
      url: './',
      images: image ? image : siteMetadata.socialBanner,
    },
    twitter: {
      card: 'summary_large_image',
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      title: title,
      description: description,
      images: image ? image : siteMetadata.socialBanner,
    },
  }
}

// remove dynamicParams
export const dynamicParams = false

// generate static params
export const generateStaticParams = ({ params }: { params: { locale: LocaleTypes } }) => {
  const getRegularPages = getSinglePage('pages', params.locale)

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }))

  return regularPages
}

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string; locale: LocaleTypes } }) => {
  const regularData = getSinglePage('pages', params.locale)
  const data = regularData.filter((page: RegularPage) => page.slug === params.regular)[0]
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
