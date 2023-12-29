import type { ImgData } from '@/types'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import Link from 'next/link'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { thumbsGallery } from '@/config/galleriesContent'
import { useWindowWidth } from '@/hooks/useWindowWidth'

type ImageSliderProps = {
  imageData: ImgData[]
  portraitDimensions: { width: number; height: number }
  landscapeDimensions: { width: number; height: number }
  selectedSerie: string
  selectedTags: string[]
  params: { locale: LocaleTypes }
}

export const ImageSlider = ({
  imageData,
  portraitDimensions,
  landscapeDimensions,
  selectedSerie,
  selectedTags,
  params,
}: ImageSliderProps) => {
  const windowWidth = useWindowWidth()
  const [thumbs, setThumbs] = useState(null)

  const filteredImages = useMemo(() => {
    const uniqueFileNames = new Set<string>()

    imageData.forEach((img) => {
      if (img.frontmatter) {
        if (
          (!selectedSerie || selectedSerie === img.frontmatter.serie) &&
          (!selectedTags.length ||
            (img.frontmatter.tags &&
              img.frontmatter.tags.some((tag) => selectedTags.includes(tag))))
        ) {
          uniqueFileNames.add(img.frontmatter.image)
        }
      }
    })

    const imageMap: { [key: string]: ImgData } = {}

    imageData.forEach((img) => {
      if (img.frontmatter) {
        imageMap[img.frontmatter.image] = img
      }
    })

    const resultImages = Array.from(uniqueFileNames).map((fileName) => imageMap[fileName])

    return resultImages
  }, [imageData, selectedSerie, selectedTags])

  const slides = filteredImages
    .sort((a, b) => {
      const fileNameA = a.frontmatter?.image || ''
      const fileNameB = b.frontmatter?.image || ''

      return fileNameA.localeCompare(fileNameB)
    })
    .map((img) => {
      const isPortrait = img.frontmatter.height > img.frontmatter.width

      const { width, height } = isPortrait ? portraitDimensions : landscapeDimensions

      return (
        <SwiperSlide
          key={img.frontmatter.image}
          style={{
            width: '533px',
            height: '533px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {img.frontmatter.draft === false ? (
            <Link
              href={{
                pathname: `/${params.locale}/${thumbsGallery}/${img.slug}`,
              }}
              aria-label={img.frontmatter.title}
            >
              <Image
                src={`${img.frontmatter.image}`}
                className="cursor-pointer"
                alt=""
                width={width}
                height={height}
                style={{ objectFit: 'contain' }}
              />
            </Link>
          ) : (
            <Image
              src={`${img.frontmatter.image}`}
              className="cursor-pointer"
              alt=""
              width={width}
              height={height}
              style={{ objectFit: 'contain' }}
            />
          )}
        </SwiperSlide>
      )
    })

  const commonHeight = 133 // Set a fixed height for both portrait and landscape

  const thumbsSlides = filteredImages.map((img, index) => {
    const isPortrait = img.frontmatter.height > img.frontmatter.width
    const { width, height } = isPortrait ? portraitDimensions : landscapeDimensions

    return (
      <SwiperSlide
        key={img.frontmatter.image}
        style={{
          flex: `0 0 ${(width / 3).toFixed(2)}px`, // Distribute width evenly among 3 images
          height: `${commonHeight}px`, // Set a common height for both portrait and landscape
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={`${img.frontmatter.image}`}
          className="cursor-grab"
          alt=""
          width={width}
          height={height}
          style={{ objectFit: 'cover' }}
        />
      </SwiperSlide>
    )
  })

  return (
    <div className="mb-10 mt-10" style={{ transform: windowWidth < 768 ? 'scale(0.8)' : 'none' }}>
      <Swiper
        loop={true}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
        className="mb-2 w-[533px] rounded  bg-theme-light p-6 dark:bg-darkmode-theme-light"
      >
        {slides}
      </Swiper>
      <Swiper
        loop={true}
        slidesPerView={3}
        onSwiper={setThumbs}
        className="w-[533px] rounded bg-theme-light p-6 dark:bg-darkmode-theme-light"
      >
        <div style={{ display: 'flex' }}>{thumbsSlides}</div>
      </Swiper>
    </div>
  )
}
