//Creating Zustand Store
import { Categories } from '@/type'
import { create } from 'zustand'

// interface HomeDataSlice {
//   data: HomeListFilm[],
//   urlDomainImage: string,
//   setHomeData: () => void,
//   setURL: () => void,
// }
export const useAllDataGetApi = create((set) => ({
    dataCategory: [],
    dataCountry: [],
    setDataCategory: (info: Categories) => set({ dataCategory: info }),
    setDataCountry: (info: Categories) => set({ dataCountry: info }),
}),
)
