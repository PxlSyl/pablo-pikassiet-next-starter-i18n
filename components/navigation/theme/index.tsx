'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useDarkMode } from '@/hooks/useDarkmode'

import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

type ThemeProps = {
  className: string
}

const ThemeSwitcher = ({ className }: ThemeProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'elements')

  const [isChecked, setIsChecked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })
  const { mounted, changeTheme } = useDarkMode()
  if (!mounted) return null

  const handleToggleChange = (): void => {
    setIsChecked(!isChecked)
    changeTheme()
  }

  return (
    <div className={className}>
      <label className="vm__checkbox">
        <input
          type="checkbox"
          id="switch"
          aria-label={t('darkmode')}
          onChange={handleToggleChange}
          checked={isChecked}
        />
        <div className="slider"></div>
      </label>
    </div>
  )
}

export default ThemeSwitcher
