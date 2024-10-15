//Creating Zustand Store
import { Categories } from '@/type'
import { create } from 'zustand'

export const useAllDataGetApi = create((set) => ({
    dataCategory: [],
    dataCountry: [],
    setDataCategory: (info: Categories) => set({ dataCategory: info }),
    setDataCountry: (info: Categories) => set({ dataCountry: info }),
}),
)
