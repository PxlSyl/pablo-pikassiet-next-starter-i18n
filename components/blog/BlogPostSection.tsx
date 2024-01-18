'use client'

import { motion } from 'framer-motion'
import BlogCard from './BlogCard'

interface BlogPostsSectionProps {
  currentPosts: any[]
  ulclassName?: string
  liclassName?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -25, y: 0 },
  show: { opacity: 1, x: 0, y: 0 },
}

const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({
  currentPosts,
  ulclassName,
  liclassName,
}) => (
  <motion.ul variants={container} initial="hidden" animate="show" className={ulclassName}>
    {currentPosts.map((post, index) => (
      <motion.li variants={item} key={index} className={liclassName}>
        <BlogCard post={post} />
      </motion.li>
    ))}
  </motion.ul>
)

export default BlogPostsSection
