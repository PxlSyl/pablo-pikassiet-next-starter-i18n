import { ReactNode } from 'react'

import { Folder, User, Clock, Calendar, Tags, ArrowLeft, ArrowRight } from './../icons'

import siteMetadata from '@/config/siteMetadata'
import { authorDefault } from '@/config/authorDefault'

import type { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

import Comments from '../Comments'
import Link from '../Link'
import PageTitle from '../PageTitle'
import Category from '../Categories'
import Tag from '../Tag'
import { PostSeriesBox } from '../PostseriesBox'
import ScrollTopAndComment from '../ScrollTopAndComment'
import Share from '../Share'
import ImageFallback from '../../helpers/ImageFallback'

import { slugify, humanize } from '@/lib/utils/textConverter'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  next,
  prev,
  children,
  params: { locale },
}: LayoutProps) {
  const { t } = await createTranslation(locale, 'blog')
  const {
    slug,
    date,
    title,
    description,
    language,
    authors,
    image,
    categories,
    tags,
    series,
    readingTime,
  } = content

  return (
    <>
      <ScrollTopAndComment scrollToComment={true} />
      <section className="section mt-20 pt-7">
        <div className="container">
          <div className="row justify-center">
            {image && (
              <div className="mb-10">
                <ImageFallback
                  src={image}
                  height={500}
                  width={1200}
                  alt={title}
                  className="w-full rounded"
                />
              </div>
            )}
            <article>
              <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                <header className="pt-6 xl:pb-6">
                  <div className="space-y-1 text-center">
                    <div>
                      <PageTitle>{title}</PageTitle>
                    </div>
                    <ul className="flex flex-wrap justify-center">
                      <li className="mr-4 flex flex-row items-center">
                        <dt className="sr-only">{t('published')}</dt>
                        <Calendar className="-mt-1 mr-2" />
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>
                            {new Date(date).toLocaleDateString(language, postDateTemplate)}
                          </time>
                        </dd>
                      </li>
                      <li className="flex flex-row items-center">
                        <Clock className="mr-2" />
                        <time>{readingTime}</time>
                      </li>
                    </ul>
                  </div>
                </header>
                <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                  <div>
                    <Share
                      className="social-icons flex items-center"
                      title={title}
                      description={description}
                      slug={slug}
                    />
                  </div>
                  <div className="mt-10 divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                    {series && (
                      <div className="not-prose mt-4">
                        <PostSeriesBox data={series} />
                      </div>
                    )}
                    <div className="content max-w-none pb-8 pt-10">{children}</div>
                    {siteMetadata.comments && (
                      <div
                        className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                        id="comment"
                      >
                        <Comments slug={slug} />
                      </div>
                    )}
                  </div>
                  <footer>
                    <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                      <div className="py-4 xl:py-8">
                        <div className="flex flex-row items-center">
                          <User className="-mt-1 mr-2" />
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {t('author')}
                          </h2>
                        </div>
                        {authors === undefined ? (
                          <Link
                            className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                            href={`/${locale}/about`}
                          >
                            {humanize(authorDefault)}
                          </Link>
                        ) : (
                          <>
                            {authors.map((author: string, index: number) => (
                              <Link
                                className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                                key={index}
                                href={
                                  author === 'default'
                                    ? `/${locale}/about`
                                    : `/${locale}/authors/${slugify(author)}`
                                }
                              >
                                {humanize(author === 'default' ? authorDefault : author)}
                                {index !== authors.length - 1 && ', '}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                      {categories && (
                        <div className="py-4 xl:py-8">
                          <div className="flex flex-row items-center">
                            <Folder className="-mt-1 mr-2" />
                            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              {t('categories')}
                            </h2>
                          </div>
                          <div className="flex flex-wrap">
                            {categories.map((category) => (
                              <Category key={category} text={category} />
                            ))}
                          </div>
                        </div>
                      )}
                      {tags && (
                        <div className="py-4 xl:py-8">
                          <div className="flex flex-row items-center">
                            <Tags className="-mt-1 mr-2" />
                            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              {t('tags')}
                            </h2>
                          </div>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                      )}
                      {(next || prev) && (
                        <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                          {prev && prev.path && (
                            <div>
                              <Link href={`/${locale}/blog/${prev.path}`}>
                                <div className="flex flex-row items-center">
                                  <ArrowLeft className="-mt-1 mr-2" />
                                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                    {t('prevpost')}
                                  </h2>
                                </div>
                                <div className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80">
                                  {prev.title}
                                </div>
                              </Link>
                            </div>
                          )}
                          {next && next.path && (
                            <div>
                              <Link href={`/${locale}/blog/${next.path}`}>
                                <div className="flex flex-row items-center">
                                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                    {t('nextpost')}
                                  </h2>
                                  <ArrowRight className="-mt-1 ml-2" />
                                </div>
                                <div className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80">
                                  {next.title}
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${locale}/blog`}
                        className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                        aria-label="Back to the blog"
                      >
                        &larr; {t('back')}
                      </Link>
                    </div>
                  </footer>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
