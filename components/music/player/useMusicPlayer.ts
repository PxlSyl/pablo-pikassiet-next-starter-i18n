import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import useMusicstate from '../store/useMusicstate'

export const useMusicPlayer = (
  id: number,
  setId: (id: number) => void,
  musicData: any[],
  totalMusicFiles: number,
  windowWidth: number,
  isFull: boolean
) => {
  const { isPlaying, setIsPlaying } = useMusicstate()
  const [volume, setVolume] = useState<number>(1)
  const [duration, setDuration] = useState<number>(0)
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const [isLooping, setIsLooping] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const audioTag = useRef<HTMLAudioElement | null>(null)
  const progressBar = useRef<HTMLInputElement | null>(null)
  const animationRef = useRef<number | null>(null)

  const music = useMemo(() => {
    if (!musicData || musicData.length === 0) return null
    return musicData.find((music) => music.id === id)
  }, [id, musicData])

  useEffect(() => {
    if (audioTag.current) {
      audioTag.current.volume = volume
    }
    if (isPlaying) {
      if (audioTag.current) {
        audioTag.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying)

        if (isMuted) {
          audioTag.current.muted = true
        } else audioTag.current.muted = false

        const interval = setInterval((): void => {
          if (audioTag.current) {
            const seconds = Math.floor(audioTag.current.duration)
            if (seconds !== 0) {
              setDuration(seconds)
            }
            if (progressBar.current) {
              if (windowWidth < 830 && !isFull) {
                progressBar.current.value = audioTag.current.currentTime.toString()
              } else {
                progressBar.current.max = audioTag.current.duration.toString()
              }
            }
          }
        }, 1000)

        setInterval((): void => {
          if (duration > 0 || duration !== undefined) {
            clearInterval(interval)
            if (audioTag.current && audioTag.current.currentTime === audioTag.current.duration) {
              isRandom ? skipRandom() : skipForward()
            }
          }
        }, 1100)
      }
    } else {
      if (audioTag.current) {
        audioTag.current.pause()
        cancelAnimationFrame(animationRef.current as number)
      }
    }

    if (audioTag.current && progressBar.current) {
      progressBar.current.value = audioTag.current.currentTime.toString()
    }
  }, [isPlaying, id, isRandom, volume, isMuted, windowWidth, duration, isFull])

  const toggleLoop = () => {
    setIsLooping((prevLooping) => !prevLooping)
  }

  useEffect(() => {
    if (audioTag.current) {
      if (isLooping) {
        audioTag.current.setAttribute('loop', '')
      } else {
        audioTag.current.removeAttribute('loop')
      }
    }
  }, [isLooping])

  const skipForward = useCallback(() => {
    if (id === totalMusicFiles) {
      setId(1)
    } else {
      const newId = id + 1
      setId(newId)
    }
  }, [id, setId, totalMusicFiles])

  const skipRandom = useCallback(() => {
    const randomNum = Math.floor(Math.random() * totalMusicFiles)
    if (randomNum === 0 || randomNum === id) {
      const newNum = randomNum + 1
      setId(newNum)
    } else {
      setId(randomNum)
    }
  }, [id, setId, totalMusicFiles])

  const skipBack = useCallback(() => {
    if (id === 1) {
      const newId = totalMusicFiles
      setId(newId)
    } else {
      const newId = id - 1
      setId(newId)
    }
  }, [id, setId, totalMusicFiles])

  const changeCurrentTime = useCallback(() => {
    if (progressBar.current) {
      setCurrentTime(parseFloat(progressBar.current.value))
    }
  }, [progressBar, setCurrentTime])

  const calculateDuration = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(sec % 60)
    const newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${newMinutes}:${newSeconds}`
  }

  const whilePlaying = useCallback((): void => {
    if (progressBar.current && audioTag.current) {
      progressBar.current.value = audioTag.current.currentTime.toString()
      animationRef.current = requestAnimationFrame(whilePlaying)
      changeCurrentTime()
    }
  }, [progressBar, audioTag, changeCurrentTime])

  const changeRange = useCallback((): void => {
    if (audioTag.current && progressBar.current) {
      audioTag.current.currentTime = parseFloat(progressBar.current.value)
      changeCurrentTime()
    }
  }, [audioTag, progressBar, changeCurrentTime])

  return {
    id,
    setId,
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
  }
}
