'use client'

import { humanize } from '@/lib/utils/textConverter'
import Breadcrumbs from '../blog/Breadcrumbs'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

const PageHeader = ({ title }: { title: string }) => {
  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'linear' }}
      className="mt-20"
    >
      <div className="container text-center">
        <div className="rounded-2xl bg-gradient-to-b from-body to-theme-light px-8 py-14 dark:from-darkmode-body dark:to-darkmode-theme-light">
          <h1 className="text-highlighted dark:text-darkmode-highlighted">{humanize(title)}</h1>
          <Breadcrumbs className="mt-6" />
        </div>
      </div>
    </motion.section>
  )
}

export default PageHeader
