import { HomeListFilm } from '@/type'

//Creating Zustand Store
import { create } from 'zustand'

// interface HomeDataSlice {
//   data: HomeListFilm[],
//   urlDomainImage: string,
//   setHomeData: () => void,
//   setURL: () => void,
// }
export const useTopViewStore = create((set) => ({
  topViewData: [],
  setTopViewData: (data: HomeListFilm[]) => set({ topViewData: data }),
}))