import { create } from 'zustand'
import { selectedThumbsGallerySerie } from '@/config/selectedSeries'

type GalleryStore = {
  selectedSerie: string
  selectSeries: (serie: string) => void
  selectedTags: string[]
  selectTag: (tag: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useGalleryStore = create<GalleryStore>((set) => ({
  selectedSerie: selectedThumbsGallerySerie,
  selectSeries: (serie: string) =>
    set((state) => {
      if (serie === state.selectedSerie) {
        return { selectedTags: [], selectedSerie: '' }
      } else {
        return { selectedTags: [], selectedSerie: serie }
      }
    }),
  selectedTags: [],
  selectTag: (tag) => {
    set((state) => {
      if (state.selectedTags.includes(tag)) {
        return { selectedSerie: '', selectedTags: [] }
      } else {
        return { selectedSerie: '', selectedTags: [tag] }
      }
    })
  },
  isOpen: true,
  setIsOpen: (isOpen) => {
    set({ isOpen })
  },
}))
