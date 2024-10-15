import { create } from "zustand";

type UseShowModalReturn = {
  isShowModal: boolean,
  contentModal: React.ReactNode | null,
  setIsShowModal: (isShowModal:boolean, contentModal: React.ReactNode) => void
}

export const useShowModal = create<UseShowModalReturn>((set) => ({
    isShowModal: false,
    contentModal: null,
    setIsShowModal: (isShowModal:boolean, contentModal: React.ReactNode) => set(() => ({isShowModal, contentModal}))
}))

interface UseSelectTabReturn {
  selectTab: string;
  setSelectTab: (selectTab: string) => void;
}

export const useSelectTab = create<UseSelectTabReturn>((set) => ({
    selectTab: "Login",
    setSelectTab: (selectTab: string) => set(() => ({selectTab}))
}))

interface UseShowMenuReturn {
  isShowMenu: boolean;
  setIsShowMenu: (value: boolean) => void;
}
  
export const useShowMenu = create<UseShowMenuReturn>((set) => ({
  isShowMenu: false,
  setIsShowMenu: (value: boolean) => set({ isShowMenu: value }),
}));

// variable show/hide result search
interface UseShowResultSearch {
  isShowResult: boolean;
  setIsShowResult: (value: boolean) => void;
}

export const useShowResultSearch = create<UseShowResultSearch>((set) => ({
  isShowResult: false,
  setIsShowResult: (value: boolean) => set({ isShowResult: value }),
}))