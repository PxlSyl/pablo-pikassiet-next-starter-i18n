'use client'

import { ImageSlider } from '@/components/gallery/thumbsGallery/imageSlider'

import { Sidebar } from '@/components/gallery/thumbsGallery/sidebar'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { useGalleryStore } from '@/components/gallery/thumbsGallery/store'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

interface GalleryProps {
  galleryData: any
  allSerie: string[]
  allTags: string[]
}

const Gallery = ({ galleryData, allSerie, allTags }: GalleryProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { selectedSerie, selectSeries, selectedTags, selectTag } = useGalleryStore()

  const windowWidth = useWindowWidth()

  const isNotMobile = windowWidth > 768
  const portraitDimensions = { width: isNotMobile ? 300 : 225, height: isNotMobile ? 400 : 300 }
  const landscapeDimensions = { width: isNotMobile ? 533 : 400, height: isNotMobile ? 400 : 300 }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'linear' }}
      className="flex flex-col items-center justify-center md:mt-20 md:flex-row"
    >
      <ImageSlider
        params={{ locale: locale }}
        imageData={galleryData}
        portraitDimensions={portraitDimensions}
        landscapeDimensions={landscapeDimensions}
        selectedSerie={selectedSerie}
        selectedTags={selectedTags}
      />
      <Sidebar
        allSerie={allSerie}
        selectedSerie={selectedSerie}
        selectSeries={selectSeries}
        allTags={allTags}
        selectedTags={selectedTags}
        selectTag={selectTag}
      />
    </motion.div>
  )
}

export default Gallery
