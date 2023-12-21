import Link from 'next/link'
import { CategoryLink } from './CategoryLink'
import { TagLink } from './TagLink'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

type PostSideBarProps = {
  params: { locale: LocaleTypes }
}

const PostSidebar = async ({ params: { locale } }: PostSideBarProps) => {
  const { t } = await createTranslation(locale, 'blog')
  return (
    <div className="mt-8 lg:col-4 sm:mt-0">
      {/* <!-- categories --> */}
      <div className="mb-8">
        <Link href={`/${locale}/categories`}>
          <h5 className="mb-6 text-highlighted dark:text-darkmode-highlighted">
            {t('categories')}
          </h5>
        </Link>
        <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light">
          <CategoryLink ulclassName="space-y-4" />
        </div>
      </div>
      {/* <!-- tags --> */}
      <div className="mb-8">
        <Link href={`/${locale}/tags`}>
          <h5 className="mb-6 text-highlighted dark:text-darkmode-highlighted">{t('tags')}</h5>
        </Link>
        <div className="rounded bg-theme-light p-6 dark:bg-darkmode-theme-light">
          <TagLink liclassName="inline-block" />
        </div>
      </div>
    </div>
  )
}

export default PostSidebar
