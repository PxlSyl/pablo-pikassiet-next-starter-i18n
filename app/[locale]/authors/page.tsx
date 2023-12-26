import { Metadata } from 'next'
import { Author } from '@/types'
import { genPageMetadata } from '../seo'
import { getSinglePage } from '@/lib/contentParser'
import AuthorCard from '@/components/blog/AuthorCard'
import PageHeader from '@/components/partials/PageHeader'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '../i18n/server'

type PageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'headerlinks')
  return genPageMetadata({
    title: t('authors'),
    description: t('authors'),
    params: { locale: locale },
  })
}

const Authors = async ({ params: { locale } }: PageProps) => {
  const { t } = await createTranslation(locale, 'headerlinks')
  const authors: Author[] = getSinglePage('authors', locale)

  return (
    <>
      <PageHeader title={t('authors')} />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {authors.map((author: Author, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <AuthorCard data={author} params={{ locale: locale }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Authors
