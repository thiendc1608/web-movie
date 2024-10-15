//Creating Zustand Store
import { create } from 'zustand'

export const useShowEpisodes = create((set) => ({
  episodes: 1,
  isShowEpisodes: false,
  setIsShowEpisodes: (data: boolean) => set({ isShowEpisodes: data }),
  setEpisodes: (data: number) => set({ episodes: data }),
}))
