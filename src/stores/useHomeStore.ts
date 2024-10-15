//Creating Zustand Store
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useHomeStore = create(
  persist(
    (set) => ({
      urlDomainImage: '',
      setURL: (info: string) => set({ urlDomainImage: info }),
    }),
    {
      name: 'urlDomain', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
)
