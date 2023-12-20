import { slugify } from '@/lib/utils/textConverter'
import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

const taxonomyFilter = (posts: CoreContent<Blog>[], name: string, key: any) =>
  posts.filter((post) =>
    //@ts-ignore
    post[name].map((name: string) => slugify(name)).includes(key)
  )

export default taxonomyFilter
