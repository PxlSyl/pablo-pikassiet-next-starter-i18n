import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'

type SidebarProps = {
  isOpen: boolean
  toggleMenu: () => void
  allSerie: string[]
  selectedSerie: string
  selectSeries: (serie: string) => void
  allTags: string[]
  selectedTags: string[]
  selectTag: (tag: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleMenu,
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
      <div className="fixed bottom-0 left-0 z-[12] h-[80px] w-[80px] rounded-tr-lg bg-highlighted dark:bg-darkmode-highlighted">
        <div className="fixed bottom-[20px] left-[20px] z-[12] h-[30px] w-[30px]">
          <input
            type="checkbox"
            aria-label="Music menu"
            id="checkbox"
            className="checkbox visuallyHidden"
          />
          <label htmlFor="checkbox">
            <div
              role="button"
              tabIndex={0}
              onClick={toggleMenu}
              onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
              className="hamburger hamburger_style"
            >
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
              <span className="bar bar4"></span>
              <span className="bar bar5"></span>
            </div>
          </label>
        </div>
      </div>
      <div
        className={`fixed left-0 z-[11] transition-transform duration-500 ${
          isOpen
            ? 'mb-100 bg-gradient bottom-0 left-0 mt-10 h-screen w-[150px] translate-y-0 transform overflow-y-auto p-4'
            : 'bottom-[-100%] h-0 translate-y-full transform'
        }`}
      >
        <div className="mb-20 mt-20">
          <div className="m-2 grid grid-cols-1">
            <p className="mb-2 mt-2 w-full rounded-md bg-highlighted px-4 py-1 text-lg font-medium text-white dark:bg-darkmode-highlighted">
              {t('serie')}
            </p>
            {Array.isArray(allSerie) &&
              allSerie.map((serie, index) => (
                <button
                  key={index}
                  className={`m-1 block rounded-lg px-2 shadow-lg hover:bg-highlighted hover:text-white dark:hover:bg-darkmode-highlighted ${
                    selectedSerie.includes(serie)
                      ? 'bg-highlighted text-white dark:bg-darkmode-highlighted'
                      : 'bg-gray-200 text-black'
                  }`}
                  onClick={() => selectSeries(serie)}
                >
                  {serie}
                </button>
              ))}
            <p className=" mb-2 mt-2 w-full rounded-md bg-highlighted px-4 py-1 text-lg font-medium text-white dark:bg-darkmode-highlighted">
              {t('tags')}
            </p>
            {allTags.map((tag, index) => (
              <button
                key={index}
                className={`m-1 block rounded-lg px-2 shadow-lg hover:bg-highlighted hover:text-white dark:hover:bg-darkmode-highlighted ${
                  selectedTags.includes(tag)
                    ? 'bg-highlighted text-white dark:bg-darkmode-highlighted'
                    : 'bg-gray-200 text-black'
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
