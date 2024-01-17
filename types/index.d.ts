export type RegularPage = {
  frontmatter: {
    title: string
    language: string
    image?: string
    description?: string
    meta_title?: string
    layout?: string
    draft?: boolean
  }
  content: string
  slug?: string
}

export type Post = {
  frontmatter: {
    title: string
    meta_title?: string
    description?: string
    image?: string
    categories: string[]
    author: string
    tags: string[]
    date?: string
    draft?: boolean
  }
  slug?: string
  content?: string
}

export type Author = {
  frontmatter: {
    title: string
    image?: string
    description?: string
    meta_title?: string
    social: [
      {
        name: string
        icon: any
        link: string
      },
    ]
  }
  content?: string
  slug?: string
}

export type Project = {
  frontmatter: {
    title: string
    imgSrc: string
    description?: string
    href: string
  }
  slug?: string
  content?: string
}

export type ImgData = {
  frontmatter: {
    draft: boolean
    image: string
    serie: string
    tags: string[]
    title: string
    description: string
    width: number
    height: number
  }
  content?: string
  slug?: string
}

export type Feature = {
  button: button
  image: string
  bulletpoints: string[]
  content: string
  title: string
}

export type Button = {
  enable: boolean
  label: string
  link: string
}
