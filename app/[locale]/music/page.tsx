import { Metadata } from 'next'
import PageHeader from '@/components/partials/PageHeader'
import MusicPlayer from './music'
import { genPageMetadata } from '../seo'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '../i18n/server'

type PageProps = {
  params: { locale: LocaleTypes; page?: number }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'headerlinks')
  return genPageMetadata({
    title: t('music'),
    params: { locale: locale },
  })
}

const Music = async ({ params: { locale } }: PageProps) => {
  const { t } = await createTranslation(locale, 'headerlinks')
  return (
    <>
      <PageHeader title={t('music')} />
      <MusicPlayer />
    </>
  )
}
export default Music
