import { MetadataRoute } from 'next'
import categoryData from '@/config/data/category-data.json'
import tagData from '@/config/data/tag-data.json'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/config/siteMetadata'
import { getSinglePage } from '@/lib/contentParser'
import { fallbackLng, secondLng } from './i18n/locales'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  function getRegularRoutes(locale: string) {
    const regular = getSinglePage('pages', locale)
    const regularRoutes = regular.map((page) => ({
      url: `${siteUrl}/${locale}/${page.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return regularRoutes
  }

  function getDrawingsRoutes(locale: string) {
    const drawings = getSinglePage('drawings', locale)
    const drawingsRoutes = drawings.map((drawing) => ({
      url: `${siteUrl}/${locale}/drawings/${drawing.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return drawingsRoutes
  }

  function getPhotosRoutes(locale: string) {
    const photos = getSinglePage('photography', locale)
    const photosRoutes = photos.map((photo) => ({
      url: `${siteUrl}/${locale}/photography/${photo.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return photosRoutes
  }

  function getBlogRoutes(locale: string) {
    const blogRoutes = allBlogs
      .filter((post) => !post.draft && post.language === locale)
      .map((post) => ({
        url: `${siteUrl}/${locale}/blog/${post.path}`,
        lastModified: post.lastmod || post.date,
      }))

    return blogRoutes
  }

  function getCategoriesRoutes(locale: string) {
    const categories = Object.keys(categoryData[locale])
    const categoryRoutes = categories.map((category) => ({
      url: `${siteUrl}/${locale}/category/${category}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return categoryRoutes
  }

  function getTagsRoutes(locale: string) {
    const tags = Object.keys(tagData[locale])
    const tagRoutes = tags.map((tag) => ({
      url: `${siteUrl}/${locale}/tags/${tag}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return tagRoutes
  }

  function getAuthorsRoutes(locale: string) {
    const authors = getSinglePage('authors', locale)
    const authorsRoutes = authors.map((author) => ({
      url: `${siteUrl}/${locale}/authors/${author.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return authorsRoutes
  }

  function getRoutes(locale: string) {
    const routes = [
      '',
      'drawing',
      'photography',
      'music',
      'about',
      'blog',
      'projects',
      'tags',
      'categories',
      'authors',
    ].map((route) => ({
      url: `${siteUrl}/${locale}/${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return routes
  }

  // Create routes for the English locale
  const enRoutes = getRoutes(fallbackLng)
  const enRegularRoutes = getRegularRoutes(fallbackLng)
  const enDrawingsRoutes = getDrawingsRoutes(fallbackLng)
  const enPhotosRoutes = getPhotosRoutes(fallbackLng)
  const enAuthorsRoutes = getAuthorsRoutes(fallbackLng)
  const enBlogRoutes = getBlogRoutes(fallbackLng)
  const enCategoriesRoutes = getCategoriesRoutes(fallbackLng)
  const enTagsRoutes = getTagsRoutes(fallbackLng)

  // Create routes for the French locale
  const frRoutes = getRoutes(fallbackLng)
  const frRegularRoutes = getRegularRoutes(secondLng)
  const frDrawingsRoutes = getDrawingsRoutes(secondLng)
  const frPhotosRoutes = getPhotosRoutes(secondLng)
  const frAuthorsRoutes = getAuthorsRoutes(secondLng)
  const frBlogRoutes = getBlogRoutes(secondLng)
  const frCategoriesRoutes = getCategoriesRoutes(secondLng)
  const frTagsRoutes = getTagsRoutes(fallbackLng)

  return [
    ...enRoutes,
    ...enRegularRoutes,
    ...enDrawingsRoutes,
    ...enPhotosRoutes,
    ...enAuthorsRoutes,
    ...enBlogRoutes,
    ...enCategoriesRoutes,
    ...enTagsRoutes,
    ...frRoutes,
    ...frRegularRoutes,
    ...frDrawingsRoutes,
    ...frPhotosRoutes,
    ...frAuthorsRoutes,
    ...frBlogRoutes,
    ...frCategoriesRoutes,
    ...frTagsRoutes,
  ]
}
