import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import Modal from '@/components/Modal/Modal'
import Navbar from '@/components/Navbar/Navbar'
import { useShowModal } from '@/stores/useShowModal'
import { ArrowUpToLine } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export default function Root() {
  const { isShowModal, contentModal } = useShowModal() as {
    isShowModal: boolean
    contentModal: React.ReactNode // or a more specific type if you know what it is
  }

  const bodyElement = document.getElementsByTagName('body')[0]
  if (isShowModal) bodyElement.style.overflow = 'hidden'
  else bodyElement.style.overflow = 'auto'
  const calcScrollValue = () => {
    const scrollButton = document.getElementById('back-to-top')
    const pos = document.documentElement.scrollTop
    if (pos > 1000) {
      ;(scrollButton?.style as CSSStyleDeclaration).display = 'block'
    } else {
      ;(scrollButton?.style as CSSStyleDeclaration).display = 'none'
    }
    scrollButton?.addEventListener('click', () => {
      document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
  window.onscroll = calcScrollValue

  return (
    <div className="relative">
      {isShowModal && <Modal>{contentModal}</Modal>}
      <header className="h-16 custom-bg w-full">
        <div className="h-full custom-page w-full">
          <Header />
        </div>
        <div className="h-[50.5px] w-full bg-[#12171b] shadow-custom">
          <Navbar />
        </div>
      </header>
      <div className="h-full mt-[50.5px]">
        {/* all the other elements */}
        <div className="bg-[#222d38]">
          <div className="custom-page bg-[#151d25]">
            <Outlet />
          </div>
        </div>
      </div>
      <div id="back-to-top" className="hidden fixed bottom-10 right-10 cursor-pointer z-[99] ">
        <button className="bg-[#1677ff] text-white w-10 h-10 rounded-full flex items-center justify-center">
          <ArrowUpToLine />
        </button>
      </div>
      <footer className="bg-[#151d25] text-[#8f8f8f] py-8 border-t border-[#435153a8]">
        <Footer />
      </footer>
    </div>
  )
}
