//Creating Zustand Store
import { Categories } from '@/type'
import { create } from 'zustand'

interface AllDataGetApiReturnType {
    dataCategory: Categories
    dataCountry: Categories
    setDataCategory: (info: Categories) => void
    setDataCountry: (info: Categories) => void
  }
  
  export const useAllDataGetApi = create<AllDataGetApiReturnType>((set) => ({
    dataCategory: {items: []},
    dataCountry: {items: []},
    setDataCategory: (info: Categories) => set({ dataCategory: info }),
    setDataCountry: (info: Categories) => set({ dataCountry: info }),
  }))