import Image from 'next/image'
import { useParams } from 'next/navigation'
import useMusicstate from '../store/useMusicstate'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

interface MusicCardPlayingProps {
  id: number
  musicId: number
  img: string
  title: string
  author: string
  album: string
  year: string
  audio: string
  genre: string
}

export const MusicCardPlaying = ({
  id,
  musicId,
  img,
  title,
  author,
  album,
  year,
  genre,
  audio,
}: MusicCardPlayingProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'music')
  const { isPlaying } = useMusicstate()

  return (
    <>
      {musicId === id && (
        <div className=" flex flex-col items-center justify-center p-4 pr-10 lg:grid lg:grid-cols-2">
          <div className="m-2 flex h-[250px] min-w-[280px] cursor-pointer flex-col items-center justify-center rounded border p-5 shadow-lg dark:border-none">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-full">
              <div className={`${isPlaying ? 'animate-spin' : ''}`}>
                <Image
                  src={img}
                  width="144"
                  height="144"
                  style={{ objectFit: 'cover' }}
                  alt="TrackCover"
                />
              </div>
            </div>
          </div>
          <div className="m-2 flex h-[250px] min-w-[280px] flex-col justify-center rounded border p-5 shadow-lg dark:border-none">
            <div>
              <p className="mr-1 inline-block text-highlighted dark:text-darkmode-highlighted">
                {t('title')}:{' '}
              </p>{' '}
              <span>{title}</span>
            </div>
            <div>
              <p className="mr-1 inline-block text-highlighted dark:text-darkmode-highlighted">
                {t('genre')}:{' '}
              </p>
              <span>{genre}</span>
            </div>
            <div>
              <p className="mr-1 inline-block text-highlighted dark:text-darkmode-highlighted">
                {t('artist')}:{' '}
              </p>
              <span>{author}</span>
            </div>
            <div>
              <p className="mr-1 inline-block text-highlighted dark:text-darkmode-highlighted">
                {t('album')}:{' '}
              </p>
              <span>{album}</span>
            </div>
            <div>
              <p className="mr-1 inline-block text-highlighted dark:text-darkmode-highlighted">
                {t('year')}:{' '}
              </p>
              <span>{year}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
