import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export const useDarkMode = () => {
  const { theme, setTheme, systemTheme } = useTheme(),
    [mounted, setMounted] = useState<boolean>(false),
    currentTheme: Theme =
      theme && systemTheme ? (theme === 'system' ? systemTheme : (theme as Theme)) : 'light'

  const changeTheme = (): void => {
    if (currentTheme === 'dark') {
      setTheme('light')
      return
    }
    setTheme('dark')
  }

  useEffect((): void => {
    setMounted(true)
  }, [])

  useEffect((): void => {
    if (currentTheme) {
      setTheme(currentTheme)
    }
  }, [currentTheme, setTheme])

  return {
    mounted,
    changeTheme,
    theme: currentTheme,
  }
}
