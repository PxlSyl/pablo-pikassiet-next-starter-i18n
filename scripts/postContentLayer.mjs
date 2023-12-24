// node ./scripts/postContentLayer.mjs

import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../config/siteMetadata.js'
import { fallbackLng, secondLng } from '../app/[locale]/i18n/locales.js'

export async function generateSlugMap() {
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
 * Count the occurrences of all tags and categories across blog posts and write to json file
 */

export async function createCategoryCount() {
  const categoryCount = { [fallbackLng]: {}, [secondLng]: {} }

  allBlogs.forEach((file) => {
    if (file.categories && file.draft === false) {
      file.categories.forEach((category) => {
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
  writeFileSync('./config/data/category-data.json', JSON.stringify(categoryCount))
  console.log('Results for category-data.json written.')
}

export async function createTagCount() {
  const tagCount = {
    [fallbackLng]: {},
    [secondLng]: {},
  }

  allBlogs.forEach((file) => {
    if (file.tags && file.draft === false) {
      file.tags.forEach((tag) => {
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

export async function createSearchIndex() {
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

async function postContentlayer() {
  await generateSlugMap(allBlogs)
  await createCategoryCount(allBlogs)
  await createTagCount(allBlogs)
  await createSearchIndex()
}

postContentlayer()
