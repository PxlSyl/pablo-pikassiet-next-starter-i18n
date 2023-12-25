import { Project } from '@/types'
import { plainify } from '@/lib/utils/textConverter'
import Image from './Image'
import Link from './Link'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

type ProjectsCardProps = {
  data: Project
  params: { locale: LocaleTypes }
}

const ProjectsCard = async ({ data, params: { locale } }: ProjectsCardProps) => {
  const { title, imgSrc, href } = data.frontmatter
  const { t } = await createTranslation(locale, 'projects')
  return (
    <div className="max-w-[544px] p-4">
      <div
        className={`${
          imgSrc && 'h-full'
        }  rounded-2xl bg-gradient-to-b from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light`}
      >
        <Link
          href={href.startsWith('http') ? href : `/${locale}${href}`}
          aria-label={`${t('linkto')}${title}`}
        >
          <Image
            alt={title}
            src={imgSrc}
            className="rounded-2xl object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        </Link>
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              aria-label={`${t('linkto')}${title}`}
            >
              {title}
            </Link>
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {' '}
            {plainify(data.content.slice(0, Number(149)))}...
          </p>
          <Link
            href={href.startsWith('http') ? href : `/${locale}${href}`}
            className="text-base font-medium leading-6 text-highlighted hover:opacity-80 dark:text-darkmode-highlighted"
            aria-label={`${t('linkto')}${title}`}
          >
            {t('learn')} &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ProjectsCard
