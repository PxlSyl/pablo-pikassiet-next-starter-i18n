import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'

type SidebarProps = {
  allSerie: string[]
  selectedSerie: string
  selectSeries: (serie: string) => void
  allTags: string[]
  selectedTags: string[]
  selectTag: (tag: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  allSerie,
  selectedSerie,
  selectSeries,
  allTags,
  selectedTags,
  selectTag,
}) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'gallery')
  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        <div className="m-4 mb-8 max-w-[300px] ">
          <div>
            <h5 className="mb-6 text-highlighted dark:text-darkmode-highlighted">{t('serie')}</h5>
          </div>
          <div className="flex flex-wrap rounded bg-theme-light p-6 dark:bg-darkmode-theme-light">
            {Array.isArray(allSerie) &&
              allSerie.map((serie, index) => (
                <button
                  key={index}
                  className={`m-1 block rounded bg-white px-3 py-1 hover:bg-highlighted hover:text-white dark:bg-darkmode-body dark:hover:bg-darkmode-highlighted ${
                    selectedSerie.includes(serie)
                      ? 'text-highlighted hover:text-white dark:text-darkmode-highlighted dark:hover:text-white'
                      : ''
                  }`}
                  onClick={() => selectSeries(serie)}
                >
                  {serie}
                </button>
              ))}
          </div>
        </div>
        <div className="m-4 max-w-[300px]">
          <div>
            <h5 className="mb-6 text-highlighted dark:text-darkmode-highlighted"> {t('tags')}</h5>
          </div>
          <div className="flex flex-wrap rounded bg-theme-light p-6 dark:bg-darkmode-theme-light">
            {allTags.map((tag, index) => (
              <button
                key={index}
                className={`m-1 block rounded bg-white px-3 py-1 hover:bg-highlighted hover:text-white dark:bg-darkmode-body dark:hover:bg-darkmode-highlighted ${
                  selectedTags.includes(tag)
                    ? 'text-highlighted hover:text-white dark:text-darkmode-highlighted dark:hover:text-white'
                    : ''
                }`}
                onClick={() => selectTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
