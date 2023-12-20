'use client'

import { useState } from 'react'
import siteMetadata from '@/config/siteMetadata'
import { Comments as CommentsComponent } from 'pliny/comments'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { useParams } from 'next/navigation'

export default function Comments({ slug }: { slug: string }) {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'blog')
  const [loadComments, setLoadComments] = useState(false)
  return (
    <>
      {!loadComments && (
        <button
          className="rounded bg-highlighted p-2 text-white hover:opacity-80 dark:bg-darkmode-highlighted dark:hover:opacity-80"
          onClick={() => setLoadComments(true)}
        >
          {t('comments')}
        </button>
      )}
      {siteMetadata.comments && loadComments && (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      )}
    </>
  )
}
