import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '@/config/postsPerPage'
import { genPageMetadata } from '../seo'

import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import PageHeader from '@/components/partials/PageHeader'
import { CategoryLink } from '@/components/blog/PostSidebar/CategoryLink'
import BlogPostsSection from '@/components/blog/BlogPostSection'
import Pagination from '@/components/blog/Pagination'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'

import { LocaleTypes } from '../i18n/settings'
import { createTranslation } from '../i18n/server'

type PageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'blog')
  return genPageMetadata({
    title: t('categories'),
    description: t('categories'),
    params: { locale: locale },
  })
}
const Categories = async ({ params: { locale } }: PageProps) => {
  const { t } = await createTranslation(locale, 'blog')
  const allPost = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allPost.filter((post) => post.draft === false && post.language === locale)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const currentPosts = filteredPosts.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <ScrollTopAndComment scrollToComment={false} />
      <PageHeader title={t('categories')} />
      <div className="mb-20 flex flex-col justify-center md:flex-row">
        <div className="mt-20">
          <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light">
            <h3 className="mb-4 text-highlighted dark:text-darkmode-highlighted">
              {t('allposts')}
            </h3>
            <CategoryLink
              ulclassName="ml-2 space-y-4"
              liclassName="inline-block md:flex md:flex-col"
            />
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
            section="categories"
            currentPage={1}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  )
}

export default Categories
