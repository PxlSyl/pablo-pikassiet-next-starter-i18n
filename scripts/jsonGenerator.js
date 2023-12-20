const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const config = require('../config/footer.json')

const { blog_folder } = config.settings
const jsonDir = './.json'

// get data from markdown
const getData = (folder) => {
  const getPath = fs.readdirSync(path.join(folder))
  const sanitizeData = getPath.filter((item) => item.includes('.md'))
  const filterData = sanitizeData.filter((item) => item.match(/^(?!_)/))
  const allData = filterData.map((filename) => {
    const file = fs.readFileSync(path.join(folder, filename), 'utf-8')
    const { data } = matter(file)
    const { content } = matter(file)
    const slug = data.slug ? data.slug : filename.replace('.md', '')

    return {
      frontmatter: data,
      content,
      slug,
    }
  })
  const publishedPages = allData.filter((page) => !page.frontmatter?.draft && page)
  return publishedPages
}

// get post data
const posts = getData(`src/content/${blog_folder}`)

try {
  // creare folder if it doesn't exist
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir)
  }

  // create posts.json file
  fs.writeFileSync(`${jsonDir}/posts.json`, JSON.stringify(posts))
} catch (err) {
  console.error(err)
}
