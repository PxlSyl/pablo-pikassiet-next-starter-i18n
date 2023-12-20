import { Metadata } from 'next'
import { genPageMetadata } from './seo'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

type PageProps = {
  params: { locale: LocaleTypes; page?: number }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'Page not found',
    params: { locale: locale },
  })
}

const NotFound = async () => {
  return (
    <>
      <section className="section-sm text-center">
        <div className="container">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <span className="block text-[8rem] font-bold text-dark dark:text-darkmode-dark">
                404
              </span>
              <h1 className="h2 mb-4">Page not found</h1>
              <div className="content">
                <p>
                  The page you are looking for might have been removed, had its name changed, or is
                  temporarily unavailable.
                </p>
              </div>
              <a href="/" className="btn btn-primary mt-8">
                Back to home
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound
