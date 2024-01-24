import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import readingTime from './lib/utils/readingTime'
import { slug } from 'github-slugger'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './config/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { allBlogs } from './.contentlayer/generated'
import { fallbackLng, secondLng } from './app/[locale]/i18n/locales'
import { defineNestedType } from 'contentlayer/source-files'

const root = process.cwd()

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

async function generateSlugMap(allBlogs) {
  const slugMap = {}

  // Process each blog post
  allBlogs.forEach((blog) => {
    const { localeid, language, slug } = blog
    const formattedLng = language === fallbackLng ? fallbackLng : secondLng

    if (!slugMap[localeid]) {
      slugMap[localeid] = {}
    }

    // Add the slug to the map for the specific language
    slugMap[localeid][formattedLng] = slug
  })

  writeFileSync('./config/data/localeid-map.json', JSON.stringify(slugMap, null, 2))
}

/**
 * Count the occurrences of all categories tags across blog posts and write to json file
 * Add logic to your own locales and project
 */

function createCategoryCount(allBlogs) {
  const categoryCount = { [fallbackLng]: {}, [secondLng]: {} }

  allBlogs.forEach((file) => {
    if (file.categories && file.draft === false) {
      file.categories.forEach((category: string) => {
        const formattedCategory = slug(category)
        if (file.language === fallbackLng) {
          categoryCount[fallbackLng][formattedCategory] =
            (categoryCount[fallbackLng][formattedCategory] || 0) + 1
        } else if (file.language === secondLng) {
          categoryCount[secondLng][formattedCategory] =
            (categoryCount[secondLng][formattedCategory] || 0) + 1
        }
      })
    }
  })

  // Write the combined count object to a single JSON file
  writeFileSync('./config/data/category-data.json', JSON.stringify(categoryCount))
  console.log('Results for category-data.json written.')
}

function createTagCount(allBlogs) {
  const tagCount = {
    [fallbackLng]: {},
    [secondLng]: {},
  }

  allBlogs.forEach((file) => {
    if (file.tags && file.draft === false) {
      file.tags.forEach((tag: string) => {
        const formattedTag = slug(tag)
        if (file.language === fallbackLng) {
          tagCount[fallbackLng][formattedTag] = (tagCount[fallbackLng][formattedTag] || 0) + 1
        } else if (file.language === secondLng) {
          tagCount[secondLng][formattedTag] = (tagCount[secondLng][formattedTag] || 0) + 1
        }
      })
    }
  })
  writeFileSync('./config/data/tag-data.json', JSON.stringify(tagCount))
  console.log('Results for tag-data.json written.')
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

export const Series = defineNestedType(() => ({
  name: 'Series',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    order: {
      type: 'number',
      required: true,
    },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: '**/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    series: { type: 'nested', of: Series },
    meta_title: { type: 'string' },
    description: { type: 'string' },
    date: { type: 'date', required: true },
    language: { type: 'string', required: true },
    localeid: { type: 'string', required: true },
    image: { type: 'string' },
    categories: { type: 'list', of: { type: 'string' }, default: [] },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' } },
    serie: { type: 'string' },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.image ? doc.image[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/blog',
  documentTypes: [Blog],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'content', 'blog') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    generateSlugMap(allBlogs)
    createTagCount(allBlogs)
    createSearchIndex(allBlogs)
  },
})
