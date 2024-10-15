import { create } from 'zustand'

const getLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
const setLocalStorage = (key: string, value: string | boolean) => localStorage.setItem(key, JSON.stringify(value))

type UserStore = {
  token: string
  currentUser: string
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  setUser: (user: string) => void
  setToken: (token: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
  token: getLocalStorage('token') || '',
  currentUser: getLocalStorage('currentUser') || '',
  isLogin: getLocalStorage('isLogin') || false,

  setIsLogin: (isLogin: boolean) =>
    set((state: { token: string; currentUser: string; isLogin: boolean }) => {
      const updateState = { ...state, isLogin }
      setLocalStorage('isLogin', isLogin)
      return updateState
    }),

  setUser: (user: string) =>
    set((state: { token: string; currentUser: string; isLogin: boolean }) => {
      const updateState = { ...state, currentUser: user }
      setLocalStorage('currentUser', user)
      return updateState
    }),
    
  setToken: (token: string) =>
    set((state: { token: string; currentUser: string; isLogin: boolean }) => {
      const updateState = { ...state, token }
      setLocalStorage('accessToken', token)
      return updateState
    }),
}))
