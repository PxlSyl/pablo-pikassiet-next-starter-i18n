interface ProgressBarProps {
  isFull: boolean
  progressBarClass: string
  sliderThumbClass: string
  calculateDuration: (time: number) => string
  duration: number
  currentTime: number
  changeRange: (e: React.ChangeEvent<HTMLInputElement>) => void
  progressBarRef: React.RefObject<HTMLInputElement>
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  isFull,
  progressBarClass,
  sliderThumbClass,
  calculateDuration,
  duration,
  currentTime,
  changeRange,
  progressBarRef,
}) => {
  return isFull ? (
    <div className="md:w-88vw lg:right-30 mb-2 flex w-full items-center md:relative md:bottom-0 md:right-10">
      <p className="w-35 relative right-5 text-sm">{calculateDuration(currentTime)}</p>
      <div className="w-380 mx-auto h-5">
        <input
          type="range"
          aria-label="ProgressBar"
          className={`${progressBarClass} h-full w-full appearance-none rounded-full`}
          defaultValue="0"
          ref={progressBarRef}
          onChange={changeRange}
        />
        <style jsx>{`
          input::-webkit-slider-thumb {
            appearance: none;
            height: 14px;
            width: 14px;
            ${sliderThumbClass};
            border-radius: 50%;
          }
        `}</style>
      </div>
      <p className="relative left-5 text-sm">
        {duration && !isNaN(duration) && calculateDuration(duration)}
      </p>
    </div>
  ) : null
}
