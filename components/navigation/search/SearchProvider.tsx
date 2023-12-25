'use client'
// use this component in layout.tsx to customize kbar search
import { ReactNode } from 'react'
import { KBarSearchProvider } from './components/KBar'
import { useParams, useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { fallbackLng } from '@/app/[locale]/i18n/locales'

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
        defaultActions: [
          /* issue when using regular translations, this is a workaround */
          {
            id: 'drawings',
            name: locale === fallbackLng ? 'Drawings' : 'Dessins',
            keywords: '',
            shortcut: ['d'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
            perform: () => router.push(`/${locale}/drawings`),
          },
          {
            id: 'photography',
            name: locale === fallbackLng ? 'Photography' : 'Photographie',
            keywords: '',
            shortcut: ['p'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
            perform: () => router.push(`/${locale}/photography`),
          },
          {
            id: 'music',
            name: locale === fallbackLng ? 'Music' : 'Musique',
            keywords: '',
            shortcut: ['m'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
            perform: () => router.push(`/${locale}/music`),
          },
          {
            id: 'projects',
            name: locale === fallbackLng ? 'Projects' : 'Projets',
            keywords: '',
            shortcut: ['p'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
            perform: () => router.push(`/${locale}/projects`),
          },
          {
            id: 'blog',
            name: locale === fallbackLng ? 'Blog' : 'Blog',
            keywords: '',
            shortcut: ['b'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
            perform: () => router.push(`/${locale}/blog`),
          },
          {
            id: 'about',
            name: locale === fallbackLng ? 'About' : 'À propos',
            keywords: '',
            shortcut: ['a'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
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
