import { Metadata } from 'next'
import Project from './project'
import { genPageMetadata } from '../seo'
import PageHeader from '@/components/partials/PageHeader'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

type ProjectsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: ProjectsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'headerlinks')
  return genPageMetadata({
    title: t('projects'),
    params: { locale: locale },
  })
}

export default async function Projects({ params: { locale } }: ProjectsProps) {
  const { t } = await createTranslation(locale, 'headerlinks')
  return (
    <>
      <PageHeader title={t('projects')} />
      <section className="section-sm mb-20 pb-0">
        <div className="container">
          <div className="row justify-center">
            <Project />
          </div>
        </div>
      </section>
    </>
  )
}
