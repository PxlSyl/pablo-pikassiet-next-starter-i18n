'use client'
// use this component in layout.tsx to customize kbar search
import { ReactNode } from 'react'
import { KBarSearchProvider } from './components/KBar'
import { useParams, useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'elements')
  const router = useRouter()

  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        // uncomment and complete this if you want to use in your app
        defaultActions: [
          {
            id: 'drawings',
            name: t('drawings'),
            keywords: '',
            shortcut: ['d'],
            section: t('navigate'),
            perform: () => router.push(`/${locale}/drawings`),
          },
          {
            id: 'photography',
            name: t('photography'),
            keywords: '',
            shortcut: ['p'],
            section: t('navigate'),
            perform: () => router.push(`/${locale}/photography`),
          },
          {
            id: 'music',
            name: t('music'),
            keywords: '',
            shortcut: ['m'],
            section: t('navigate'),
            perform: () => router.push(`/${locale}/music`),
          },
          {
            id: 'projects',
            name: t('projects'),
            keywords: '',
            shortcut: ['p'],
            section: t('navigate'),
            perform: () => router.push(`/${locale}/projects`),
          },
          {
            id: 'blog',
            name: t('blog'),
            keywords: '',
            shortcut: ['b'],
            section: t('navigate'),
            perform: () => router.push(`/${locale}/blog`),
          },
          {
            id: 'about',
            name: t('about'),
            keywords: '',
            shortcut: ['a'],
            section: t('navigate'),
            perform: () => router.push(`/${locale}/about`),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json
            .filter((post: CoreContent<Blog>) => post.language === locale)
            .map((post: CoreContent<Blog>) => ({
              id: post.path,
              name: post.title,
              keywords: post?.summary || '',
              section: t('content'),
              subtitle: post.tags.join(', '),
              perform: () => router.push(`/${locale}/blog/${post.path}`),
            }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
