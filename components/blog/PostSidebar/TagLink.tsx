'use client'

import Link from 'next/link'
import tagData from '@/config/data/tag-data.json'
import { useParams, usePathname } from 'next/navigation'
import { humanize } from '@/lib/utils/textConverter'
import { sortData } from '@/lib/utils/sortData'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

export const TagLink = ({
  liclassName,
  ulclassName,
}: {
  liclassName?: string
  ulclassName?: string
}) => {
  const locale = useParams()?.locale as LocaleTypes
  const pathname = usePathname()
  const tagCounts = tagData[locale]
  const sortedTags = sortData(tagCounts)
  return (
    <ul className={ulclassName}>
      {sortedTags.map((tag: string) => (
        <li className={liclassName} key={tag}>
          <Link
            className={`${
              pathname.includes(tag) ? 'text-highlighted dark:text-darkmode-highlighted' : ''
            } m-1 block rounded bg-white px-3 py-1 hover:bg-highlighted hover:text-white dark:bg-darkmode-body dark:hover:bg-darkmode-highlighted dark:hover:text-white`}
            href={`/${locale}/tags/${tag}`}
          >
            {`${humanize(tag)} (${tagCounts[tag]})`}
          </Link>
        </li>
      ))}
    </ul>
  )
}
