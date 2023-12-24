// import { ImgMenu } from '@/components/gallery/ImgMenu'
import { Metadata } from 'next'
import type { ImgData } from '@/types'
import { useMemo } from 'react'
import { genPageMetadata } from '../seo'
import PageHeader from '@/components/partials/PageHeader'
import Gallery from '@/components/gallery/drawings'
import { getSinglePage } from '@/lib/contentParser'

import { LocaleTypes } from '../i18n/settings'
import { createTranslation } from '../i18n/server'
import { fallbackLng } from '../i18n/locales'

type PageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'headerlinks')
  return genPageMetadata({
    title: t('drawings'),
    params: { locale: locale },
  })
}

const Drawings = ({ params: { locale } }: PageProps) => {
  const pagetitle = locale === fallbackLng ? 'Drawings' : 'Dessins'
  const galleryData: ImgData[] = getSinglePage('gallery', locale)

  const allSerie = useMemo(
    () => Array.from(new Set(galleryData.map((item) => item.frontmatter.serie))).sort(),
    [galleryData]
  )
  const allTags = useMemo(
    () => Array.from(new Set(galleryData.flatMap((item) => item.frontmatter.tags))).sort(),
    [galleryData]
  )

  return (
    <div>
      <PageHeader title={pagetitle} />
      <Gallery galleryData={galleryData} allSerie={allSerie} allTags={allTags} />
    </div>
  )
}

export default Drawings
