import React from 'react'
import DynamicIcon from '../helpers/DynamicIcon'
import * as SocialIcons from '../navigation/icons'

interface ISocial {
  name: string
  icon: any
  link?: string
}

type SocialProps = {
  source: ISocial[]
  className: string
}

const Social = ({ source, className }: SocialProps) => {
  return (
    <ul className={className}>
      {source.map((social) =>
        social.link !== undefined ? (
          <li key={social.name}>
            <a
              aria-label={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span className="sr-only">{social.name}</span>
              <DynamicIcon icon={SocialIcons[social.icon]} />
            </a>
          </li>
        ) : null
      )}
    </ul>
  )
}

export default Social
