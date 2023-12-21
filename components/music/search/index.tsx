import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

type SearchProps = {
  isSearch: boolean
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({ isSearch, handleSearchChange }: SearchProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'music')
  const bgClass = 'bg-white dark:bg-gray-800'

  return (
    <>
      {isSearch && (
        <>
          <div className="flex flex-col items-center justify-center" data-te-input-wrapper-init>
            <input
              id="searchmusic"
              name="searchmusic"
              onChange={handleSearchChange}
              placeholder={t('search')}
              type="text"
              className={`${bgClass} mx-auto my-2 mt-10 w-1/2 cursor-pointer rounded border-gray-300 px-3 py-[0.32rem] leading-[1.6] outline-none`}
            />
            <div className="text-sm">{t('searchdescription')} </div>
          </div>
        </>
      )}
    </>
  )
}
