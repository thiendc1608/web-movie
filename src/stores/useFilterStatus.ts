//Creating Zustand Store
import { create } from 'zustand'

export const useFilterStatus = create((set) => ({
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
