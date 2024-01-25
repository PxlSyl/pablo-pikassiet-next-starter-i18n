import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

import siteMetadata from '@/config/siteMetadata'
import { authorDefault } from '@/config/authorDefault'

import { Folder, User, Calendar, Clock, Tags } from './../icons'

import Comments from '../Comments'
import Link from '../Link'
import PageTitle from '../PageTitle'
import { PostSeriesBox } from '../PostseriesBox'
import ScrollTopAndComment from '../ScrollTopAndComment'
import Share from '../Share'
import ImageFallback from '../../helpers/ImageFallback'

import { slugify, humanize } from '@/lib/utils/textConverter'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
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
    title,
    description,
    language,
    image,
    slug,
    authors,
    categories,
    tags,
    date,
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
              <div>
                <header>
                  <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
                    <div>
                      <PageTitle>{title}</PageTitle>
                    </div>
                    <ul className="flex flex-wrap justify-center">
                      <li className="mr-4 flex flex-row items-center">
                        <dt className="sr-only">{t('published')}</dt>
                        <Calendar className="-mt-1 mr-2" />
                        <dd className="text-base font-medium leading-6">
                          <time dateTime={date}>{formatDate(date, language)}</time>
                        </dd>
                      </li>
                      <li className="flex flex-row items-center">
                        <Clock className="mr-2" />
                        <time>{readingTime}</time>
                      </li>
                    </ul>
                  </div>
                  <ul className="mb-4 mt-4 flex flex-wrap text-center">
                    <li className="mr-4 flex flex-row items-center">
                      <User className="mr-2" />
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
                    </li>
                    <li className="mr-4 flex flex-row items-center">
                      <Folder className="mr-2" />
                      {categories?.map((category: string, index: number) => (
                        <Link
                          className="mx-1 text-highlighted  hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                          key={category}
                          href={`/${locale}/categories/${slugify(category)}`}
                        >
                          {humanize(category)}
                          {index !== categories.length - 1 && ', '}
                        </Link>
                      ))}
                    </li>
                    <li className="flex flex-row items-center">
                      <Tags className="mr-2" />
                      {tags?.map((tag: string) => (
                        <Link
                          className="mx-1 text-highlighted  hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                          key={tag}
                          href={`/${locale}/tags/${slugify(tag)}`}
                        >
                          #{humanize(tag)}
                        </Link>
                      ))}
                    </li>
                  </ul>
                </header>
                <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
                  {series && (
                    <div className="not-prose mt-4">
                      <PostSeriesBox data={series} />
                    </div>
                  )}
                  <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                    <div className="content max-w-none pb-8 pt-10">{children}</div>
                  </div>
                  <div className="flex items-center">
                    <Share
                      className="social-icons "
                      title={title}
                      description={description}
                      slug={slug}
                    />
                  </div>
                  {siteMetadata.comments && (
                    <div
                      className="mt-10 pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                      id="comment"
                    >
                      <Comments slug={slug} />
                    </div>
                  )}
                  <footer>
                    <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                      {prev && prev.path && (
                        <div className="pt-4 xl:pt-8">
                          <Link
                            href={`/${locale}/blog/${prev.path}`}
                            className="text-highlighted  hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                            aria-label={`Previous post: ${prev.title}`}
                          >
                            &larr; {prev.title}
                          </Link>
                        </div>
                      )}
                      {next && next.path && (
                        <div className="pt-4 xl:pt-8">
                          <Link
                            href={`/${locale}/blog/${next.path}`}
                            className="text-highlighted  hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                            aria-label={`Next post: ${next.title}`}
                          >
                            {next.title} &rarr;
                          </Link>
                        </div>
                      )}
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
