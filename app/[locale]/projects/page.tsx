import { Metadata } from 'next'
import { Project } from '@/types'
import ProjectsCard from '@/components/blog/projectsCard'
import { getSinglePage } from '@/lib/contentParser'
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
  const projects: Project[] = getSinglePage('projects', locale)
  return (
    <>
      <PageHeader title={t('projects')} />
      <div className="mb-20 mt-20 flex flex-col items-center justify-center pb-0 md:flex-row">
        {projects.map((project: any, index: number) => (
          <div key={index}>
            <ProjectsCard data={project} params={{ locale: locale }} />
          </div>
        ))}
      </div>
    </>
  )
}
