import { create } from 'zustand'
import { useHomeStore } from './useHomeStore'

export const useAppStore = create((...a) => ({
  ...(useHomeStore as object)(...a),
}))