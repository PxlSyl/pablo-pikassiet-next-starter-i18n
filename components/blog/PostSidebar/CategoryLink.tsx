'use client'

import Link from 'next/link'
import categoryData from '@/config/data/category-data.json'
import { useParams, usePathname } from 'next/navigation'
import { humanize } from '@/lib/utils/textConverter'
import { sortData } from '@/lib/utils/sortData'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

export const CategoryLink = ({
  liclassName,
  ulclassName,
}: {
  liclassName?: string
  ulclassName?: string
}) => {
  const locale = useParams()?.locale as LocaleTypes
  const pathname = usePathname()
  const categoryCounts = categoryData[locale]
  const sortedCategories = sortData(categoryCounts)
  return (
    <ul className={ulclassName}>
      {sortedCategories.map((category: string) => (
        <li className={liclassName} key={category}>
          <Link
            className={`${
              pathname.includes(category) ? 'text-highlighted dark:text-darkmode-highlighted' : ''
            } flex justify-between px-3 py-1 hover:text-highlighted dark:hover:text-darkmode-highlighted`}
            href={`/${locale}/categories/${category}`}
          >
            {`${humanize(category)} (${categoryCounts[category]})`}
          </Link>
        </li>
      ))}
    </ul>
  )
}
