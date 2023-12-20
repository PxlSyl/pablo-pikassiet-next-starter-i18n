'use client'

import siteMetadata from '@/config/siteMetadata'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableColorScheme={false}>
      {children}
    </ThemeProvider>
  )
}

export default Providers
