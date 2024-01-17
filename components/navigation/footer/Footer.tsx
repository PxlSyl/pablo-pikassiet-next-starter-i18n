import Link from 'next/link'

import footer from '@/config/footer.json'
import { footerLinks } from '@/config/headerLinks'

import siteMetadata from '@/config/siteMetadata'
import SocialIcons from '../icons/social'

import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

import { markdownify } from '@/lib/utils/textConverter'

type FooterProps = {
  params: { locale: LocaleTypes }
}

const Footer = async ({ params: { locale } }: FooterProps) => {
  const { t } = await createTranslation(locale, 'headerlinks')
  const { copyright, credits } = footer.params

  return (
    <footer className="bg-theme-light dark:bg-darkmode-theme-light">
      <div className="container pt-10">
        <div className="mb-8 justify-center text-center">
          <SocialIcons className="social-icons" />
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
                <Link href={`/${locale}${link.href}`}>{t(`${link.title.toLowerCase()}`)}</Link>
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
