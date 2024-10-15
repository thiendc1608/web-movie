import { create } from "zustand";

export const useShowModal = create((set) => ({
    isShowModal: false,
    contentModal: null,
    setIsShowModal: (isShowModal:boolean, contentModal: React.ReactNode) => set(() => ({isShowModal, contentModal}))
}))

export const useSelectTab = create((set) => ({
    selectTab: "Login",
    setSelectTab: (selectTab: string) => set(() => ({selectTab}))
}))

export const useShowMenu = create((set) => ({
    isShowMenu: false,
    setIsShowMenu: (isShowMenu: boolean) => set(() => ({isShowMenu}))
}))