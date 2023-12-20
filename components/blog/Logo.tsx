'use client'

import siteMetadata from '@/config/siteMetadata'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

type LogoProps = { src?: string }

const Logo = ({ src }: LogoProps) => {
  const locale = useParams()?.locale as LocaleTypes
  // destructuring items from config object
  const { logo, logo_darkmode, logo_width, logo_height, logo_text, title } = siteMetadata

  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const resolvedLogo =
    mounted && (theme === 'dark' || resolvedTheme === 'dark') ? logo_darkmode : logo
  const logoPath = src ? src : resolvedLogo

  return (
    <Link href={`/${locale}`} className="navbar-brand inline-block">
      {logoPath ? (
        <Image
          width={logo_width.replace('px', '') * 2}
          height={logo_height.replace('px', '') * 2}
          src={logoPath}
          alt={title}
          priority
          style={{
            height: logo_height.replace('px', '') + 'px',
            width: logo_width.replace('px', '') + 'px',
          }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  )
}

export default Logo
