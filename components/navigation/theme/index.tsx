'use client'

import React, { useState } from 'react'
import { useDarkMode } from '@/hooks/useDarkmode'

type ThemeProps = {
  className: string
}

const ThemeSwitcher = ({ className }: ThemeProps) => {
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
          aria-label="Theme"
          onChange={handleToggleChange}
          checked={isChecked}
        />
        <div className="slider"></div>
      </label>
    </div>
  )
}

export default ThemeSwitcher
