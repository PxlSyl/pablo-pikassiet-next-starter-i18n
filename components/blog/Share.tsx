'use client'

import siteMetadata from '@/config/siteMetadata'
import {
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
} from 'react-icons/io5/index.js'
import { usePathname } from 'next/navigation'

type ShareProps = { title: string; description?: string; slug: string; className?: string }

const Share = ({ title, description, slug, className }: ShareProps) => {
  const pathname = usePathname()
  // Extracting the second path
  const pathSegments = pathname.split('/')
  const secondPath = pathSegments.length >= 2 ? pathSegments[1] : ''

  return (
    <ul className={className}>
      <li className="inline-block">
        <a
          aria-label="facebook share button"
          href={`https://facebook.com/sharer/sharer.php?u=${siteMetadata.base_url}/${secondPath}/${slug}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoFacebook />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="twitter share button"
          href={`https://twitter.com/intent/tweet/?text=${title}&amp;url=${siteMetadata.base_url}/${secondPath}/${slug}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoTwitter />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="linkedin share button"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.base_url}/${secondPath}/${slug}&title=${title}&summary=${description}&source=${siteMetadata.base_url}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoLinkedin />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="pinterest share button"
          href={`https://pinterest.com/pin/create/button/?url=${siteMetadata.base_url}/${secondPath}/${slug}&media=&description=${description}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoPinterest />
        </a>
      </li>
    </ul>
  )
}

export default Share
