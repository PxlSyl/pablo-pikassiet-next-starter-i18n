import { slug } from 'github-slugger'
import { marked } from 'marked'

// slugify
export const slugify = (content: string) => {
  return slug(content)
}

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  const markdownContent: any = div ? marked.parse(content) : marked.parseInline(content)
  return { __html: markdownContent }
}

// capitalize first letter
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase()
    })
}

// plainify
export const plainify = async (content: string) => {
  const parseMarkdown = await marked.parse(content)
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, '')
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, '')
  const stripHTML = htmlEntityDecoder(filterSpaces)
  return stripHTML
}

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  const entityList: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
  }
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity]
    }
  )
  return htmlWithoutEntities
}
