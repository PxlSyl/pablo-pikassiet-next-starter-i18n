import { Metadata } from 'next'
import Link from 'next/link'
import siteMetadata from '@/config/siteMetadata'
import tagData from '@/config/data/tag-data.json'
import { POSTS_PER_PAGE } from '@/config/postsPerPage'

import taxonomyFilter from '@/lib/utils/taxonomyFilter'
import { sortData } from '@/lib/utils/sortData'
import { capitalizeFirstLetter } from '@/lib/utils/textConverter'

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import PageHeader from '@/components/partials/PageHeader'
import { TagLink } from '@/components/blog/PostSidebar/TagLink'
import BlogPostsSection from '@/components/blog/BlogPostSection'
import Pagination from '@/components/blog/Pagination'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '../../i18n/server'

type PageProps = {
  params: { locale: LocaleTypes; single: string }
}

export async function generateMetadata({
  params: { locale, single },
}: PageProps): Promise<Metadata | undefined> {
  const title = capitalizeFirstLetter(single)
  const { t } = await createTranslation(locale, 'blog')
  return {
    title: title,
    description: t('tags'),
    openGraph: {
      title: title,
      description: t('tags'),
      siteName: siteMetadata.title,
      locale: locale,
      type: 'website',
      url: './',
      images: siteMetadata.socialBanner,
    },
    twitter: {
      card: 'summary_large_image',
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      title: title,
      description: t('tags'),
      images: siteMetadata.socialBanner,
    },
  }
}

// remove dynamicParams
export const dynamicParams = false

// generate static params
export const generateStaticParams = ({ params: { locale } }: PageProps) => {
  const tagCounts = tagData[locale]
  const sortedTags = sortData(tagCounts)
  const paths = sortedTags.map((tag) => ({
    single: tag,
  }))

  return paths
}

const TagSingle = async ({ params: { locale, single } }: PageProps) => {
  const { t } = await createTranslation(locale, 'blog')
  const allPost = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allPost.filter((post) => post.draft === false && post.language === locale)
  const filterByTags = taxonomyFilter(filteredPosts, 'tags', single)
  const totalPages = Math.ceil(filterByTags.length / POSTS_PER_PAGE)
  const currentPosts = filterByTags.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <ScrollTopAndComment scrollToComment={false} />
      <PageHeader title={single} />
      <div className="mb-20 flex flex-col justify-center md:flex-row">
        <div className="mb-4 mt-20">
          <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light">
            <Link href={`/${locale}/tags`}>
              <h3 className="mb-4 hover:text-highlighted dark:hover:text-darkmode-highlighted">
                {t('allposts')}
              </h3>
            </Link>
            <TagLink ulclassName="ml-2 space-y-4 " liclassName="inline-block md:flex md:flex-col" />
          </div>
        </div>
        <div className="section-sm pb-0">
          <BlogPostsSection
            params={{ locale: locale }}
            currentPosts={currentPosts}
            ulclassName="container max-w-[600px]"
            liclassName="mb-14"
          />
          <Pagination
            params={{ locale: locale }}
            section={`tags/${single}`}
            currentPage={1}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  )
}

export default TagSingle
