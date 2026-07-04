import { create } from 'zustand'
import type { SchemeId } from '../data/types'

interface VenturesState {
  compareIds: SchemeId[]
  toggleCompare: (id: SchemeId) => void
  clearCompare: () => void
  paletteOpen: boolean
  setPaletteOpen: (open: boolean) => void
  lastViewed: SchemeId | null
  setLastViewed: (id: SchemeId) => void
}

const MAX_COMPARE = 3

export const useStore = create<VenturesState>((set) => ({
  compareIds: [],
  toggleCompare: (id) =>
    set((state) => {
      if (state.compareIds.includes(id)) {
        return { compareIds: state.compareIds.filter((c) => c !== id) }
      }
      if (state.compareIds.length >= MAX_COMPARE) {
        return { compareIds: [...state.compareIds.slice(1), id] }
      }
      return { compareIds: [...state.compareIds, id] }
    }),
  clearCompare: () => set({ compareIds: [] }),
  paletteOpen: false,
  setPaletteOpen: (open) => set({ paletteOpen: open }),
  lastViewed: null,
  setLastViewed: (id) => set({ lastViewed: id }),
}))
