import { Metadata } from 'next'
import Link from 'next/link'
import siteMetadata from '@/config/siteMetadata'
import { maintitle } from '@/config/localeMetadata'
import categoryData from '@/config/data/category-data.json'
import { POSTS_PER_PAGE } from '@/config/postsPerPage'

import taxonomyFilter from '@/lib/utils/taxonomyFilter'
import { capitalizeFirstLetter } from '@/lib/utils/textConverter'

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import PageHeader from '@/components/partials/PageHeader'
import { CategoryLink } from '@/components/blog/PostSidebar/CategoryLink'
import BlogPostsSection from '@/components/blog/BlogPostSection'
import Pagination from '@/components/blog/Pagination'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

type PageProps = {
  params: { locale: LocaleTypes; single: string; page?: number }
}

export async function generateMetadata({
  params: { locale, single },
}: PageProps): Promise<Metadata | undefined> {
  const title = capitalizeFirstLetter(single)
  const { t } = await createTranslation(locale, 'blog')

  return {
    title: title,
    description: t('categories'),
    openGraph: {
      title: title,
      description: t('categories'),
      url: './',
      siteName: maintitle[locale],
      images: siteMetadata.socialBanner,
      locale: locale,
      type: 'website',
    },
    twitter: {
      title: title,
      description: t('categories'),
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: siteMetadata.socialBanner,
    },
  }
}

// remove dynamicParams
export const dynamicParams = true

// generate static params
export const generateStaticParams = ({ params: { locale, single } }: PageProps) => {
  const categoryCount = categoryData[locale][single] || 0
  const totalPages = Math.ceil(categoryCount / POSTS_PER_PAGE)
  const paths: { page: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    paths.push({
      page: i.toString(),
    })
  }

  return paths
}

const CategorySingle = async ({ params: { locale, page, single } }: PageProps) => {
  const { t } = await createTranslation(locale, 'blog')
  const allPost = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allPost.filter((post) => post.draft === false && post.language === locale)
  const filterByCategories = taxonomyFilter(filteredPosts, 'categories', single)
  const totalPages = Math.ceil(filterByCategories.length / POSTS_PER_PAGE)
  const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = filterByCategories.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <>
      <ScrollTopAndComment scrollToComment={false} />
      <PageHeader title={single} />
      <div className="mb-20 flex flex-col justify-center md:flex-row">
        <div className="mt-20">
          <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light">
            <Link href={`/${locale}/categories`}>
              <h3 className="mb-4 hover:text-highlighted dark:hover:text-darkmode-highlighted">
                {t('allposts')}
              </h3>
            </Link>
            <CategoryLink
              ulclassName="ml-2 space-y-4"
              liclassName="inline-block md:flex md:flex-col"
            />
          </div>
        </div>
        <div className="section-sm pb-0">
          <BlogPostsSection
            currentPosts={currentPosts}
            ulclassName="container max-w-[600px]"
            liclassName="mb-14"
          />
          <Pagination
            params={{ locale: locale }}
            section={`categories/${single}`}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  )
}

export default CategorySingle
