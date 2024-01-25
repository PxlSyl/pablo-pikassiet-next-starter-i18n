import { ReactNode } from 'react'
import Bleed from 'pliny/ui/Bleed'
import siteMetadata from '@/config/siteMetadata'
import { authorDefault } from '@/config/authorDefault'

import { Folder, User, Calendar, Clock } from './../icons'

import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

import Comments from '../Comments'
import Link from '../Link'
import PageTitle from '../PageTitle'
import ScrollTopAndComment from '../ScrollTopAndComment'
import { PostSeriesBox } from '../PostseriesBox'
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
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  params: { locale: LocaleTypes }
}

export default async function PostMinimal({
  content,
  next,
  prev,
  children,
  params: { locale },
}: LayoutProps) {
  const { t } = await createTranslation(locale, 'blog')
  const {
    slug,
    title,
    description,
    language,
    image,
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
            <article>
              <div>
                <div className="space-y-1 pb-10 text-center dark:border-gray-700">
                  <div className="w-full">
                    <Bleed>
                      {image && (
                        <div className="relative aspect-[2/1] w-full">
                          <ImageFallback
                            src={image}
                            alt={title}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                      )}
                    </Bleed>
                  </div>
                  <div className="relative mb-3 pt-10">
                    <PageTitle>{title}</PageTitle>
                  </div>
                </div>
                <ul className="mb-2 mt-2 flex flex-wrap justify-center">
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
                            className="mx-1 text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
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
                        className="mx-1 text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                        key={category}
                        href={`/${locale}/categories/${slugify(category)}`}
                      >
                        {humanize(category)}
                        {index !== categories.length - 1 && ', '}
                      </Link>
                    ))}
                  </li>
                  {date && (
                    <li className="mr-4 flex flex-row items-center">
                      <dt className="sr-only">{t('published')}</dt>
                      <Calendar className="-mt-1 mr-2" />
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(language, postDateTemplate)}
                      </time>
                    </li>
                  )}
                  <li className="flex flex-row items-center">
                    <Clock className="mr-2" />
                    <time>{readingTime}</time>
                  </li>
                </ul>
                {series && (
                  <div className="not-prose mt-4">
                    <PostSeriesBox data={series} />
                  </div>
                )}
                <div className="content max-w-none py-4 ">{children}</div>
                <div className="flex flex-col justify-center text-sm font-medium sm:flex-row sm:justify-between">
                  <div className="mb-6 flex items-center sm:mb-0 ">
                    <h5 className="mr-3 text-highlighted dark:text-darkmode-highlighted">
                      {t('tags')}
                    </h5>
                    {tags?.map((tag: string, index: number) => (
                      <Link
                        className="mx-1 hover:text-highlighted hover:dark:text-darkmode-highlighted"
                        key={tag}
                        href={`/${locale}/tags/${slugify(tag)}`}
                      >
                        #{humanize(tag)}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center ">
                    <Share
                      className="social-icons"
                      title={title}
                      description={description}
                      slug={slug}
                    />
                  </div>
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
                          className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
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
                          className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
                          aria-label={`Next post: ${next.title}`}
                        >
                          {next.title} &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
