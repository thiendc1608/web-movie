//Creating Zustand Store
import { create } from 'zustand'

interface FilterStatus {
  isCheckFilter: boolean
  timePost: string
  listMovie: string
  listCategory: string
  listCountry: string
  listYear: string
  setIsCheckFilter: (data: boolean) => void
  setTimePost: (data: string) => void
  setListMovie: (data: string) => void
  setListCategory: (data: string) => void
  setListCountry: (data: string) => void
  setListYear: (data: string) => void
}

export const useFilterStatus = create<FilterStatus>((set) => ({
  isCheckFilter: false,
  setIsCheckFilter: (data: boolean) => set({ isCheckFilter: data }),
  timePost: "",
  setTimePost: (data: string) => set({ timePost: data }),
  listMovie: "",
  setListMovie: (data: string) => set({ listMovie: data }),
  listCategory: "",
  setListCategory: (data: string) => set({ listCategory: data }),
  listCountry: "",
  setListCountry: (data: string) => set({ listCountry: data }),
  listYear: "",
  setListYear: (data: string) => set({ listYear: data }),
}))
