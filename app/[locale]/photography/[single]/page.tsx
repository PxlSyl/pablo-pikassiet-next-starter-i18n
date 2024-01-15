import { ImgData } from '@/types'
import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { maintitle } from '@/config/localeMetadata'

import PageHeader from '@/components/partials/PageHeader'
import ImageFallback from '@/components/helpers/ImageFallback'
import MDXContent from '@/components/helpers/MDXContent'
import Share from '@/components/blog/Share'
import Comments from '@/components/blog/Comments'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'
import { thumbsGallery } from '@/config/galleriesContent'
import { getSinglePage } from '@/lib/contentParser'
import { LocaleTypes } from '../../i18n/settings'

type PageProps = {
  params: { single: string; locale: LocaleTypes }
}

export async function generateMetadata({
  params: { single, locale },
}: PageProps): Promise<Metadata | undefined> {
  const imagesData: ImgData[] = getSinglePage(thumbsGallery, locale)
  const imageSingle = imagesData.filter((page) => page.slug === single)[0]
  const { frontmatter } = imageSingle
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
export const generateStaticParams = ({ params: { single, locale } }: PageProps) => {
  const imagesData: ImgData[] = getSinglePage(thumbsGallery, locale)
  const paths = imagesData.map((image) => ({
    single: image.slug,
    locale: locale,
  }))

  return paths
}

const ImageSingle = ({ params: { single, locale } }: PageProps) => {
  const imagesData: ImgData[] = getSinglePage(thumbsGallery, locale)
  const imageSingle = imagesData.filter((page) => page.slug === single)[0]
  const { frontmatter, content, slug } = imageSingle
  const { title, description, image, width, height } = frontmatter

  return (
    <>
      <ScrollTopAndComment scrollToComment />
      <PageHeader title={title} />
      <section className="section-sm pb-0">
        <div className="container">
          <article className="flex flex-col items-center justify-center border-b border-border pb-14 dark:border-darkmode-border">
            <div className="text-center lg:col-4">
              {image && (
                <ImageFallback
                  src={`${image}`}
                  className="mx-auto mb-10 rounded"
                  height={height}
                  width={width}
                  alt={title}
                />
              )}
              <h1 className="h3 mb-6 text-highlighted dark:text-darkmode-highlighted">Details:</h1>
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
            <div className="m-4 flex items-center justify-center lg:col-4">
              <Share className="social-icons" title={title} description={description} slug={slug} />
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default ImageSingle
