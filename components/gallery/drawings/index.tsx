'use client'

import { ImageSlider } from '@/components/gallery/drawings/imageSlider'

import { Sidebar } from '@/components/gallery/drawings/sidebar'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { useGalleryStore } from '@/components/gallery/drawings/store'

import { useParams } from 'next/navigation'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

interface GalleryProps {
  galleryData: any
  allSerie: string[]
  allTags: string[]
}

const Gallery = ({ galleryData, allSerie, allTags }: GalleryProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { isOpen, setIsOpen, selectedSerie, selectSeries, selectedTags, selectTag } =
    useGalleryStore()
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const windowWidth = useWindowWidth()

  const isNotMobile = windowWidth > 768
  const portraitDimensions = { width: isNotMobile ? 300 : 225, height: isNotMobile ? 400 : 300 }
  const landscapeDimensions = { width: isNotMobile ? 533 : 400, height: isNotMobile ? 400 : 300 }

  return (
    <>
      <div className="mt-20 w-screen">
        <ImageSlider
          params={{ locale: locale }}
          imageData={galleryData}
          portraitDimensions={portraitDimensions}
          landscapeDimensions={landscapeDimensions}
          selectedSerie={selectedSerie}
          selectedTags={selectedTags}
          selectTag={selectTag}
        />
      </div>
      <Sidebar
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        allSerie={allSerie}
        selectedSerie={selectedSerie}
        selectSeries={selectSeries}
        allTags={allTags}
        selectedTags={selectedTags}
        selectTag={selectTag}
      />
    </>
  )
}

export default Gallery
