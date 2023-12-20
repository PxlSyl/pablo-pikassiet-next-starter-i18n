'use client'

import Link from 'next/link'

import footer from '@/config/footer.json'
import social from '@/config/social.json'
import { footerLinks } from '@/config/headerLinks'

import siteMetadata from '@/config/siteMetadata'
import NewsletterForm from '../../blog/NewsletterForm'
import Social from '../../blog/Social'

import { markdownify } from '@/lib/utils/textConverter'

const Footer = () => {
  const { copyright, credits } = footer.params

  return (
    <footer className="bg-theme-light dark:bg-darkmode-theme-light">
      <div className="container">
        <div className="mb-8 justify-center text-center">
          <Social source={social.main} className="social-icons" />
        </div>
        <div className="mb-2 flex flex-row justify-center space-x-2 text-center text-sm">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
        <div className="mb-8 justify-center text-center">
          <ul>
            {footerLinks.map((link) => (
              <li
                className="m-3 inline-block text-sm underline hover:text-highlighted dark:hover:text-darkmode-highlighted"
                key={link.title}
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-7 dark:border-darkmode-border">
        <div className="container text-center text-light dark:text-darkmode-light">
          <p dangerouslySetInnerHTML={markdownify(copyright)} />
          <p dangerouslySetInnerHTML={markdownify(credits)} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
