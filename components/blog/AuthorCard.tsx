import Link from 'next/link'
import Social from './Social'

import { plainify } from '@/lib/utils/textConverter'
import ImageFallback from '../helpers/ImageFallback'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'

type AuthorCardProps = {
  data: any
  params: { locale: LocaleTypes }
}

const AuthorCard = ({ data, params: { locale } }: AuthorCardProps) => {
  const { title, image, social } = data.frontmatter
  return (
    <div className="rounded bg-theme-light p-8 text-center dark:bg-darkmode-theme-light">
      {image && (
        <Link href={`/${locale}/authors/${data.slug}`}>
          <ImageFallback
            className="mx-auto mb-6 rounded"
            src={image}
            alt={title}
            width={120}
            height={120}
          />
        </Link>
      )}
      <h4 className="mb-3">
        <Link
          className=" text-highlighted dark:text-darkmode-highlighted"
          href={`/${locale}/authors/${data.slug}`}
        >
          {title}
        </Link>
      </h4>
      <Link href={`/${locale}/authors/${data.slug}`}>
        <p className="mb-4">{plainify(data.content?.slice(0, 300))}...</p>
        <p className="mb-4 text-highlighted hover:opacity-80 dark:text-darkmode-highlighted">
          Read more &rarr;
        </p>
      </Link>
      <Social source={social} className="social-icons" />
    </div>
  )
}

export default AuthorCard
