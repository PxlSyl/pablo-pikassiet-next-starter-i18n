import Link from 'next/link'
import { slugify } from '@/lib/utils/textConverter'

const Category = ({ text }: { text: string }) => {
  return (
    <Link
      href={`/categories/${slugify(text)}`}
      className="mr-3 text-sm font-medium uppercase text-highlighted hover:opacity-80 dark:text-darkmode-highlighted dark:hover:opacity-80"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Category
