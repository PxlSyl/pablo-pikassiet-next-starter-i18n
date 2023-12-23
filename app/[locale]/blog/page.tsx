import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '@/config/postsPerPage'

import BlogPostsSection from '@/components/blog/BlogPostSection'
import Pagination from '@/components/blog/Pagination'
import PageHeader from '@/components/partials/PageHeader'
import PostSidebar from '@/components/blog/PostSidebar'

import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '../seo'

import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

type PageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'headerlinks')
  return genPageMetadata({
    title: t('posts'),
    params: { locale: locale },
  })
}

// for all regular pages
const Posts = ({ params: { locale } }: PageProps) => {
  const allPost = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allPost.filter((post) => post.draft === false && post.language === locale)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const currentPosts = filteredPosts.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <PageHeader title="Blog Posts" />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div className="lg:col-8">
              <BlogPostsSection
                params={{ locale: locale }}
                currentPosts={currentPosts}
                ulclassName="row"
                liclassName="mb-14 md:col-6"
              />
              <Pagination
                params={{ locale: locale }}
                section="blog"
                currentPage={1}
                totalPages={totalPages}
              />
            </div>
            <PostSidebar params={{ locale: locale }} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Posts
