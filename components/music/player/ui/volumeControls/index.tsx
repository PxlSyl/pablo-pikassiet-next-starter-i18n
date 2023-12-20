import { VolumeOff, VolumeOn } from '../svgs'

interface VolumeControlsProps {
  isMuted: boolean
  setIsMuted: (muted: boolean) => void
  setVolume: (volume: number) => void
  volume: number
  volumebarClass: string
  sliderthumbclass: string
}

export const VolumeControls: React.FC<VolumeControlsProps> = ({
  isMuted,
  setIsMuted,
  setVolume,
  volume,
  volumebarClass,
  sliderthumbclass,
}) => {
  return (
    <div className="w-400 ml-4 flex items-center justify-end">
      <button
        className="volumeButton"
        id="buttonMute"
        aria-label="Mute"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeOff /> : <VolumeOn />}
      </button>
      <input
        className={`${volumebarClass} w-120 mr-15 ml-2 h-5 appearance-none rounded-full outline-none`}
        type="range"
        aria-label="Volume"
        step="0.01"
        onChange={(e) => {
          const newVolume = parseFloat(e.target.value)
          setVolume(newVolume)
        }}
        value={volume}
        max="1"
        min="0"
      />
      <style jsx>{`
        input::-webkit-slider-thumb {
          appearance: none;
          height: 14px;
          width: 14px;
          ${sliderthumbclass};
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}
