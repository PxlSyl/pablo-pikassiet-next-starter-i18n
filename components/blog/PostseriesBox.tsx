'use client'

import Link from 'next/link'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

export type PostSeriesProps = {
  data: any
}

export const PostSeriesBox = ({ data }: PostSeriesProps) => {
  const currentIndex = data.posts.findIndex((post) => post.isCurrent) + 1
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'blog')

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {t('series')} {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {t('episodes')} ({currentIndex}/{data.posts.length})
        <ul>
          {data.posts.map((p) => (
            <li
              key={p.slug}
              className={`relative my-3 list-none pl-7 text-sm before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full
              ${
                p.isCurrent
                  ? 'before:bg-accent-foreground/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10'
                  : 'hover:before:bg-accent-foreground/90 font-bold before:bg-highlighted/30 hover:before:ring-[3px] hover:before:ring-highlighted hover:before:ring-offset-1 hover:before:ring-offset-black/10 dark:hover:before:ring-darkmode-highlighted'
              }`}
            >
              {p.isCurrent ? (
                <span>{p.title}</span>
              ) : (
                <Link
                  className="transition-colors duration-200 ease-in-out hover:text-highlighted dark:hover:text-darkmode-highlighted"
                  href={`/${p.language}/blog/${p.slug}`}
                >
                  {p.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
