import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import shortcodes from '../shortcodes/all'

interface IMdxOptions {
  remarkPlugins?: any[]
  rehypePlugins?: any[]
}

const MDXContent = ({ content }: { content: any }) => {
  const mdxOptions: IMdxOptions = {
    remarkPlugins: [remarkGfm],
  }

  return (
    <>
      {/* @ts-ignore */}
      <MDXRemote source={content} components={shortcodes} options={{ mdxOptions }} />
    </>
  )
}

export default MDXContent
