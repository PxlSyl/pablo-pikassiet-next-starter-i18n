import Link from 'next/link'
import { slug } from 'github-slugger'

interface TagProps {
  text: string
}

const Tag = ({ text }: TagProps) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
