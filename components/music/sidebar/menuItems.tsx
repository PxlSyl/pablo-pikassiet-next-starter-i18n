import { useDarkMode } from '@/hooks/useDarkmode'
import { All, AllSelected, Search, SearchSelected } from '../player/ui/svgs/index'
import { defaultClass } from '../styles'

interface MenuItemsProps {
  selectedItem: string
  handleSelect: (item: 'All' | 'Search') => void
  t: (key: string) => string
}

export const MenuItems = ({ selectedItem, handleSelect, t }: MenuItemsProps) => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  const fill = ` ${theme === 'light' ? '#70abf8' : '#ec4899'}`
  const darkmode = ` ${theme === 'light' ? '#000000' : '#ffffff'}`
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelect('All')
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSelect('All')
          }
        }}
        className={`${defaultClass} mb-2 ml-4 ${
          selectedItem === 'All' ? 'text-highlighted dark:text-darkmode-highlighted' : ''
        }`}
      >
        {selectedItem === 'All' ? <AllSelected fill={fill} /> : <All fill={darkmode} />}
        <p className="ml-3 text-lg">{t('all')}</p>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelect('Search')
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSelect('Search')
          }
        }}
        className={`${defaultClass} mb-2 ml-4 ${
          selectedItem === 'Search' ? 'text-highlighted dark:text-darkmode-highlighted' : ''
        }`}
      >
        {selectedItem === 'Search' ? <SearchSelected fill={fill} /> : <Search fill={darkmode} />}
        <p className="ml-3 text-lg">{t('search')}</p>
      </div>
    </div>
  )
}
