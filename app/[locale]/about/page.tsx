import { RegularPage } from '@/types'
import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'

import ImageFallback from '@/components/helpers/ImageFallback'
import MDXContent from '@/components/helpers/MDXContent'
import PageHeader from '@/components/partials/PageHeader'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'
import { LocaleTypes } from '../i18n/settings'
import { fallbackLng } from '../i18n/locales'

type PageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata | undefined> {
  const data: RegularPage = getListPage(`about/${locale}/_index.md`)
  const { frontmatter } = data
  const { title, description, image } = frontmatter

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: siteMetadata.title,
      locale: locale,
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

const About = ({ params: { locale } }: PageProps) => {
  const pagetitle = locale === fallbackLng ? 'About' : 'À propos'
  const data: RegularPage = getListPage(`about/${locale}/_index.md`)
  const { frontmatter, content } = data
  const { title, image } = frontmatter

  return (
    <>
      <PageHeader title={pagetitle} />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              {image && (
                <ImageFallback
                  className="mx-auto mb-6 rounded-lg"
                  src={image}
                  width={200}
                  height={200}
                  alt={title}
                />
              )}
              <h2
                dangerouslySetInnerHTML={markdownify(title)}
                className="h3 mb-6 text-highlighted dark:text-darkmode-highlighted"
              />
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
