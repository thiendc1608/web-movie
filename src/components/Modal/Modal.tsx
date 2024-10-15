import { useShowModal } from '@/stores/useShowModal'
import React from 'react'

type ModalProps = {
  children: React.ReactNode
}

interface UseShowModalReturn {
  setIsShowModal: (isShowModal: boolean, contentModal: React.ReactNode) => void
  // Add other properties and methods as needed
}

const Modal = ({ children }: ModalProps) => {
  const { setIsShowModal } = useShowModal() as UseShowModalReturn
  return (
    <div
      className="absolute h-screen w-screen bg-[rgba(0,0,0,0.6)] z-[1000] overflow-hidden flex items-center justify-center"
      onClick={() => setIsShowModal(false, null)}
    >
      {children}
    </div>
  )
}

export default Modal
