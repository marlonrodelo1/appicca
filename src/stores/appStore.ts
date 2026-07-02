import { create } from 'zustand'
import type { Church } from '@/types'

interface AppState {
  selectedChurch: Church | null
  isOnline: boolean
  setSelectedChurch: (church: Church | null) => void
  setOnline: (online: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedChurch: null,
  isOnline: true,
  setSelectedChurch: (selectedChurch) => set({ selectedChurch }),
  setOnline: (isOnline) => set({ isOnline }),
}))
