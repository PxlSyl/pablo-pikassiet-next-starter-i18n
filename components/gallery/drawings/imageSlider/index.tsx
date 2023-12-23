import type { ImgData } from '@/types'
import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

SwiperCore.use([EffectCoverflow, Pagination])

type ImageSliderProps = {
  imageData: ImgData[]
  portraitDimensions: { width: number; height: number }
  landscapeDimensions: { width: number; height: number }
  selectedSerie: string
  selectedTags: string[]
  selectTag: (tag: string) => void
  params: { locale: LocaleTypes }
}

export const ImageSlider = ({
  imageData,
  portraitDimensions,
  landscapeDimensions,
  selectedSerie,
  selectedTags,
  selectTag,
  params: { locale },
}: ImageSliderProps) => {
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

      const slideStyle = {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }

      return (
        <SwiperSlide
          key={img.frontmatter.image}
          style={{
            ...slideStyle,
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <div className="relative transition duration-500 sm:hover:scale-105">
            {img.frontmatter.draft === false ? (
              <Link
                href={{
                  pathname: `/${locale}/drawings/${img.slug}`,
                }}
                aria-label={img.frontmatter.title}
              >
                <Image src={`${img.frontmatter.image}`} alt="" width={width} height={height} />
              </Link>
            ) : (
              <Image src={`${img.frontmatter.image}`} alt="" width={width} height={height} />
            )}
            <div className="absolute left-0 top-2 bg-transparent text-black">
              {img.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => selectTag(tag)}
                  onKeyDown={(e) => e.key === 'Enter' && selectTag(tag)}
                  role="button"
                  tabIndex={0}
                  className={`mx-1 block rounded-lg px-1 shadow-lg 
                  ${
                    selectedTags.includes(tag) ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'
                  }`}
                  style={{ marginBottom: '4px' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </SwiperSlide>
      )
    })

  const swiperStyle = {
    width: '100%',
    paddingTop: '50px',
    paddingBottom: '50px',
  }

  return (
    <Swiper
      style={swiperStyle}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true, el: '' }}
    >
      {slides}
    </Swiper>
  )
}
