import { create } from 'zustand'

type MusicState = {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

const useMusicstate = create<MusicState>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}))

export default useMusicstate
