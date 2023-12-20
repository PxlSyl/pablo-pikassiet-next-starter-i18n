import { Metadata } from 'next'
import { Button, Feature } from '@/types'
import { FaCheck } from 'react-icons/fa/index.js'
import { genPageMetadata } from './seo'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'

import siteMetadata from '@/config/siteMetadata'
import CallToAction from '@/components/partials/CallToAction'
import ImageFallback from '@/components/helpers/ImageFallback'
import Testimonials from '@/components/partials/Testimonials'
import NewsletterForm from '@/components/blog/NewsletterForm'

import { LocaleTypes } from './i18n/settings'

interface HomeProps {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: HomeProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'Home',
    params: { locale: locale },
  })
}

const Home = ({ params: { locale } }: HomeProps) => {
  const homepage = getListPage('homepage/_index.md')
  const testimonial = getListPage('sections/testimonial.md')
  const callToAction = getListPage('sections/call-to-action.md')
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
              <h1 className="mb-4" dangerouslySetInnerHTML={markdownify(banner.title)} />
              <p className="mb-8" dangerouslySetInnerHTML={markdownify(banner.content ?? '')} />
              {banner.button!.enable && (
                <a className="btn btn-primary" href={banner.button!.link}>
                  {banner.button!.label}
                </a>
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
            <div className="row items-center justify-between">
              <div className={`mb:md-0 mb-6 md:col-5 ${index % 2 !== 0 && 'md:order-2'}`}>
                <ImageFallback src={feature.image} height={480} width={520} alt={feature.title} />
              </div>
              <div className={`md:col-7 lg:col-6 ${index % 2 !== 0 && 'md:order-1'}`}>
                <h2 className="mb-4" dangerouslySetInnerHTML={markdownify(feature.title)} />
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
                  <a className="btn btn-primary mt-5" href={feature.button.link}>
                    {feature.button.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
      {siteMetadata.newsletter?.provider && (
        <div className="mb-10 flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

export default Home
