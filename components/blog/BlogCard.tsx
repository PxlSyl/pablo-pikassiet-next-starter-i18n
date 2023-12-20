import Link from 'next/link'

import { FaRegFolder, FaRegUserCircle, FaRegClock, FaTags } from 'react-icons/fa/index.js'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import { humanize, slugify } from '@/lib/utils/textConverter'

import ImageFallback from '../helpers/ImageFallback'
import { authorDefault } from '@/config/authorDefault'
import { Blog } from 'contentlayer/generated'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

interface Props {
  post: CoreContent<Blog>
  params: { locale: LocaleTypes }
}

const BlogCard = async ({ post, params: { locale } }: Props) => {
  const { t } = await createTranslation(locale, 'blog')
  if (!post) {
    return null
  }
  const { path, title, language, summary, image, authors, categories, tags, date } = post

  return (
    <div className="bg-body dark:bg-darkmode-body">
      {image && (
        <Link href={`/${locale}/blog/${path}`}>
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
        <Link href={`/${locale}/blog/${path}`}>{title}</Link>
      </h4>
      <ul className="mb-4 ">
        <li className="mr-4 inline-block">
          <FaRegUserCircle className={'-mt-1 mr-2 inline-block'} />
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
        <li className="mr-4 inline-block">
          <FaRegFolder className={'-mt-1 mr-2 inline-block'} />
          {categories?.map((category: string, index: number) => (
            <Link
              className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
              key={index}
              href={`/${locale}/categories/${slugify(category)}`}
            >
              {humanize(category)}
              {index !== categories.length - 1 && ', '}
            </Link>
          ))}
        </li>
        <li className="mr-4 inline-block">
          <FaTags className={'-mt-1 mr-2 inline-block'} />
          {tags?.map((tag: string, index: number) => (
            <Link
              className="text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
              key={index}
              href={`/${locale}/tags/${slugify(tag)}`}
            >
              {humanize(tag)}
              {index !== tags.length - 1 && ', '}
            </Link>
          ))}
        </li>
        {date && (
          <li className="inline-block">
            {' '}
            <FaRegClock className={'-mt-1 mr-2 inline-block'} />
            <time dateTime={date}>{formatDate(date, language)}</time>
          </li>
        )}
      </ul>
      <p className="mb-6">{summary.length > 149 ? `${summary.substring(0, 149)}...` : summary}</p>
      <Link className="btn btn-outline-primary btn-sm" href={`/${locale}/blog/${path}`}>
        {t('readmore')}
      </Link>
    </div>
  )
}

export default BlogCard
