import { useDarkMode } from '@/hooks/useDarkmode'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  NoRepeat,
  RandomMusicsTrue,
  RandomMusicsFalse,
  Download,
} from '../svgs'

interface Music {
  id: number
  image: string
  title: string
  author: string
  url: string
  genre: string
}

interface PlaybackControlsProps {
  id: number
  music: Music
  isPlaying: boolean
  isRandom: boolean
  isLooping: boolean
  setIsPlaying: (playing: boolean) => void
  setIsRandom: (random: boolean) => void
  skipBack: () => void
  skipForward: () => void
  toggleLoop: () => void
}

export const PlaybackControls = ({
  id,
  music,
  isPlaying,
  isRandom,
  isLooping,
  setIsPlaying,
  setIsRandom,
  skipBack,
  skipForward,
  toggleLoop,
}: PlaybackControlsProps) => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  const fill = ` ${theme === 'light' ? '#70abf8' : '#ec4899'}`
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-35 h-35">
        {id && music ? (
          <button
            key={id}
            className="mr-2 cursor-pointer rounded-full border-0 bg-transparent outline-none hover:scale-110"
            id="buttonDownload"
            aria-label="Download"
          >
            <a href={music.url} download>
              <Download fill={fill} />
            </a>
          </button>
        ) : (
          <div
            className="mr-2 cursor-pointer rounded-full border-0 bg-transparent outline-none hover:scale-110"
            style={{ width: '100%', height: '100%' }}
          >
            <Download fill={fill} />
          </div>
        )}
      </div>
      <div className="w-25 h-25">
        <button
          onClick={() => setIsRandom(!isRandom)}
          className="mr-2 cursor-pointer rounded-full border-0 bg-transparent outline-none hover:scale-110"
          id="buttonRandom"
          aria-label="Random"
        >
          {id && music && isRandom ? <RandomMusicsTrue fill={fill} /> : <RandomMusicsFalse />}
        </button>
      </div>
      <div>
        <button
          className="cursor-pointer rounded-full border-0 bg-transparent outline-none hover:scale-110"
          id="buttonSkipback"
          aria-label="Skipback"
          onClick={skipBack}
        >
          <SkipBack fill={fill} />
        </button>
      </div>
      <div className="w-45 h-45">
        <button
          className="mx-3 cursor-pointer rounded-full border-0 bg-transparent outline-none hover:scale-110"
          id="buttonPlayPause"
          aria-label="PlayPause"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause fill={fill} /> : <Play fill={fill} />}
        </button>
      </div>
      <div>
        <button
          className="cursor-pointer rounded-full border-0 bg-transparent outline-none hover:scale-110"
          id="buttonSkipforward"
          aria-label="Skipforward"
          onClick={skipForward}
        >
          <SkipForward fill={fill} />
        </button>
      </div>
      <div className="w-25 h-25 ml-2 cursor-pointer rounded-full border-0 bg-transparent outline-none hover:scale-110">
        {id && music ? (
          <div>
            <button key={id} onClick={toggleLoop} id="buttonLoop" aria-label="Loop">
              {isLooping ? <Repeat fill={fill} /> : <NoRepeat />}
            </button>
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%' }}>
            <NoRepeat />
          </div>
        )}
      </div>
    </div>
  )
}
