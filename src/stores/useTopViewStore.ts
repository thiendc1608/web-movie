import { HomeListFilm } from '@/type'

//Creating Zustand Store
import { create } from 'zustand'

interface TopViewStore {
  topViewData: HomeListFilm[],
  setTopViewData: (data: HomeListFilm[]) => void,
}

export const useTopViewStore = create<TopViewStore>((set) => ({
  topViewData: [],
  setTopViewData: (data: HomeListFilm[]) => set({ topViewData: data }),
}))