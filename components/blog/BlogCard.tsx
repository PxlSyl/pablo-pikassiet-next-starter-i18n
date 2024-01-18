'use client'

import Link from 'next/link'

import { Folder, User, Clock, Tags } from './icons'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import { humanize, slugify } from '@/lib/utils/textConverter'

import ImageFallback from '../helpers/ImageFallback'
import { authorDefault } from '@/config/authorDefault'
import { Blog } from 'contentlayer/generated'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { useParams } from 'next/navigation'

interface BlogCardProps {
  post: CoreContent<Blog>
}

const BlogCard = async ({ post }: BlogCardProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'blog')
  if (!post) {
    return null
  }

  const { path, title, language, summary, image, authors, categories, tags, date } = post

  return (
    <div className="bg-body dark:bg-darkmode-body">
      {image && (
        <Link href={`/${locale}/blog/${path}`} aria-label={`${t('linkto')}${title}`}>
          <ImageFallback
            className="mb-6 w-full rounded"
            src={image}
            alt={title}
            width={445}
            height={230}
          />
        </Link>
      )}
      <h4 className="mb-3">
        <Link href={`/${locale}/blog/${path}`} aria-label={`${t('linkto')}${title}`}>
          {title}{' '}
        </Link>
      </h4>
      <ul className="mb-4 ">
        <li className="mr-4 inline-block">
          <User className={'-mt-1 mr-2 inline-block'} />
          {authors === undefined ? (
            <Link
              className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
              href={`/${locale}/about`}
              aria-label={`${t('linkto')}${title}`}
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
                  aria-label={`${t('linkto')}${title}`}
                >
                  {humanize(author === 'default' ? authorDefault : author)}
                  {index !== authors.length - 1 && ', '}
                </Link>
              ))}
            </>
          )}
        </li>
        <li className="mr-4 inline-block">
          <Folder className={'-mt-1 mr-2 inline-block'} />
          {categories?.map((category: string, index: number) => (
            <Link
              className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
              key={index}
              href={`/${locale}/categories/${slugify(category)}`}
              aria-label={`${t('linkto')}${title}`}
            >
              {humanize(category)}
              {index !== categories.length - 1 && ', '}
            </Link>
          ))}
        </li>
        <li className="mr-4 inline-block">
          <Tags className={'-mt-1 mr-2 inline-block'} />
          {tags?.map((tag: string, index: number) => (
            <Link
              className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
              key={index}
              href={`/${locale}/tags/${slugify(tag)}`}
              aria-label={`${t('linkto')}${title}`}
            >
              {humanize(tag)}
              {index !== tags.length - 1 && ', '}
            </Link>
          ))}
        </li>
        {date && (
          <li className="inline-block">
            {' '}
            <Clock className={'-mt-1 mr-2 inline-block'} />
            <time dateTime={date}>{formatDate(date, language)}</time>
          </li>
        )}
      </ul>
      <p className="mb-6">{summary.length > 149 ? `${summary.substring(0, 149)}...` : summary}</p>
      <Link
        className="btn btn-outline-primary btn-sm"
        href={`/${locale}/blog/${path}`}
        aria-label={`${t('linkto')}${title}`}
      >
        {t('readmore')}
      </Link>
    </div>
  )
}

export default BlogCard
