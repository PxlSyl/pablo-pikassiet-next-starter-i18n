import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

interface MusicInfoProps {
  music: {
    image: string
    title: string
    author: string
    url: string
  }
  isFull: boolean
  windowWidth: number
  isPlaying: boolean
  audioTag: React.RefObject<HTMLAudioElement>
}

export const MusicInfo: React.FC<MusicInfoProps> = ({
  music,
  isFull,
  windowWidth,
  isPlaying,
  audioTag,
}) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'music')

  return (
    <>
      <div className="w-auto items-center">
        {music && (
          <div className="ml-5 flex justify-center">
            {isFull && windowWidth > 600 && (
              <Image className="rounded-full" alt="" width={60} height={60} src={music.image} />
            )}
            <audio src={music.url} ref={audioTag} />
          </div>
        )}
        {!music && windowWidth > 600 && (
          <div className="ml-5 flex justify-center" style={{ width: 60, height: 60 }}>
            <div style={{ width: 60, height: 60 }} />
          </div>
        )}
      </div>
      {windowWidth >= 1025 && (
        <div className="ml-10 min-w-[200px] items-center justify-between text-sm">
          {music && isFull ? (
            <div className="truncate">
              {music.author}-{music.title}
            </div>
          ) : (
            <div className="text-center text-lg">{t('choose')}</div>
          )}
        </div>
      )}
    </>
  )
}
