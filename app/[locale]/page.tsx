import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Feature } from '@/types'
import { FaCheck } from 'react-icons/fa/index.js'
import { genPageMetadata } from './seo'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'

import siteMetadata from '@/config/siteMetadata'
import ImageFallback from '@/components/helpers/ImageFallback'
import NewsletterForm from '@/components/blog/NewsletterForm'

import { LocaleTypes } from './i18n/settings'
import { createTranslation } from './i18n/server'

interface HomeProps {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: HomeProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'headerlinks')
  return genPageMetadata({
    title: t('home'),
    description: t('home'),
    params: { locale: locale },
  })
}

const Home = ({ params: { locale } }: HomeProps) => {
  const homepage = getListPage(`homepage/${locale}/_index.md`)
  const { frontmatter } = homepage
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button }
    features: Feature[]
  } = frontmatter

  return (
    <>
      <section className="section mt-20 pt-14">
        <div className="container">
          <div className="row justify-center">
            <div className="mb-16 text-center lg:col-7">
              <h1
                className="mb-4 text-highlighted dark:text-darkmode-highlighted"
                dangerouslySetInnerHTML={markdownify(banner?.title ?? '')}
              />
              <p className="mb-8" dangerouslySetInnerHTML={markdownify(banner.content ?? '')} />
              {banner.button!.enable && (
                <Link href={banner.button!.link}>
                  <button className="h-[40px] w-[240px] rounded-md bg-highlighted p-2 px-4 py-2 font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-highlighted focus:ring-offset-2 dark:bg-darkmode-highlighted dark:ring-offset-black dark:hover:bg-opacity-80 sm:py-0">
                    {banner.button!.label}
                  </button>
                </Link>
              )}
            </div>
            {banner.image && (
              <div className="col-12">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="800"
                  height="420"
                  alt="banner image"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>
      {features.map((feature, index: number) => (
        <section key={index} className={`section-sm ${index % 2 === 0 && 'bg-gradient'}`}>
          <div className="container">
            <div className="row items-center justify-center">
              <div className={`md:col-7 lg:col-6 ${index % 2 !== 0 && 'md:order-1'}`}>
                <h2
                  className="mb-4 text-highlighted dark:text-darkmode-highlighted"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={'absolute left-0 top-1.5'} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <Link href={feature.button.link}>
                    <button className="mt-4 h-[40px] w-[230px] rounded-md bg-highlighted p-2 px-4 py-2 font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-highlighted focus:ring-offset-2 dark:bg-darkmode-highlighted dark:ring-offset-black dark:hover:bg-opacity-80 sm:py-0">
                      {feature.button.label}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
      {siteMetadata.newsletter?.provider && (
        <div className="mb-10 flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

export default Home
