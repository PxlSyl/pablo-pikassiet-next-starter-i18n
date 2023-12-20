import { useMusicPlayer } from './useMusicPlayer'
import { useDarkMode } from '@/hooks/useDarkmode'
import { MusicInfo } from './ui/musicInfo'
import { ProgressBar } from './ui/progressBar'
import { PlaybackControls } from './ui/playbackControls'
import { VolumeControls } from './ui/volumeControls'

interface Music {
  id: number
  image: string
  title: string
  author: string
  url: string
  genre: string
}

type PlayerProps = {
  id: number
  setId: (e: number) => void
  isFull: boolean
  windowWidth: number
  musicData: Music[]
  totalMusicFiles: number
}

export const Player: React.FC<PlayerProps> = ({
  id,
  setId,
  isFull,
  windowWidth,
  musicData,
  totalMusicFiles,
}): JSX.Element | null => {
  const {
    isPlaying,
    volume,
    duration,
    isRandom,
    isLooping,
    currentTime,
    isMuted,
    audioTag,
    progressBar,
    music,
    toggleLoop,
    skipForward,
    skipBack,
    changeRange,
    calculateDuration,
    setIsPlaying,
    setVolume,
    setIsRandom,
    setIsMuted,
  } = useMusicPlayer(id, setId, musicData, totalMusicFiles, windowWidth, isFull)

  const { theme, mounted } = useDarkMode()
  if (!mounted) return null

  const containerClass = 'bg-gray-200 dark:bg-darkmode-body'
  const progressbarClass = 'bg-gray-300 dark:bg-white'
  const volumebarClass = 'bg-gray-300 dark:bg-white'
  const sliderthumbclass = ` ${theme === 'light' ? 'background: #70abf8' : 'background: #70abf8'}`

  return (
    <div className="aspect-w-4 aspect-h-3 relative w-full">
      <div className="z-5 max-h-25vh fixed bottom-0 left-0 right-0 w-full">
        <div className={`${containerClass} shadow-top relative z-10 flex h-28 w-full items-center`}>
          <div className="w-24" />
          <MusicInfo
            music={music}
            isFull={isFull}
            windowWidth={windowWidth}
            isPlaying={isPlaying}
            audioTag={audioTag}
          />
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-row items-center">
              <div className="flex flex-col md:flex-row">
                <ProgressBar
                  isFull={isFull}
                  progressBarClass={progressbarClass}
                  sliderThumbClass={sliderthumbclass}
                  calculateDuration={calculateDuration}
                  duration={duration}
                  currentTime={currentTime}
                  changeRange={changeRange}
                  progressBarRef={progressBar}
                />
                <PlaybackControls
                  id={id}
                  music={music}
                  isPlaying={isPlaying}
                  isRandom={isRandom}
                  isLooping={isLooping}
                  setIsPlaying={setIsPlaying}
                  setIsRandom={setIsRandom}
                  skipBack={skipBack}
                  skipForward={skipForward}
                  toggleLoop={toggleLoop}
                />
              </div>
              {windowWidth > 830 && (
                <VolumeControls
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  setVolume={setVolume}
                  volume={volume}
                  volumebarClass={volumebarClass}
                  sliderthumbclass={sliderthumbclass}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
