'use client'

import siteMetadata from '@/config/siteMetadata'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableColorScheme={false}>
      {children}
    </ThemeProvider>
  )
}

export default Providers
