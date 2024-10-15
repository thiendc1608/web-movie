import { ListDataTypes } from '@/type'

//Creating Zustand Store
import { create } from 'zustand'

interface TopViewStore {
  topViewData: Partial<ListDataTypes>,
  setTopViewData: (data: ListDataTypes) => void,
}

export const useTopViewStore = create<TopViewStore>((set) => ({
  topViewData: [],
  setTopViewData: (data: ListDataTypes) => set({ topViewData: data }),
}))