import { useState, useEffect } from 'react'

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }

    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  const handleResize = (): void => {
    setWindowWidth(window.innerWidth)
  }

  return windowWidth
}
