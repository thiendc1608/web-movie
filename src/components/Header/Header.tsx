import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.jpg'
import { Login, Search } from './index.tsx'
import { Button } from '../ui/button.tsx'
import { useShowModal } from '@/stores/useShowModal.ts'
import { useUserStore } from '@/stores/useUserStore.ts'
import { ChevronDown, Heart } from 'lucide-react'
import { useState } from 'react'
import { auth } from '../../firebase/firebase.ts'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

const Header = () => {
  const { setIsShowModal } = useShowModal()
  const { isLogin, currentUser, setIsLogin, setUser, setToken } = useUserStore()
  const [isExpand, setIsExpand] = useState(false)

  const handleOnClick = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false)
        setUser('')
        setToken('')
        toast.success('Logout successfully')
      })
      .catch((error) => {
        console.log(error)

        // An error happened.
      })
  }
  return (
    <div className="h-full w-full flex justify-between items-center">
      <div className="flex items-center h-full text-sm text-[#e9eaee]">
        <Link to="/" className="flex items-center gap-1.5 cursor-pointer no-underline">
          <img src={logo} alt="logo" className="h-10 w-10 object-cover" />
          <p className="text-2xl sm:flex hidden text-white font-bold whitespace-nowrap ">
            Cuồng
            <span className="text-[#1890ff]">Phim</span>
          </p>
        </Link>
      </div>
      <div className="hidden sm:flex items-center">
        <Search />
      </div>
      <div className="flex items-center gap-2">
        {!isLogin ? (
          <Button
            className="text-[#0f0707] hover:text-[#ff3939]  bg-[#3dc031] hover:bg-[#3be907] px-3 py-2 rounded-md"
            onClick={() => setIsShowModal(true, <Login />)}
          >
            Login
          </Button>
        ) : (
          <div className="flex items-center text-white relative cursor-pointer" onClick={() => setIsExpand(!isExpand)}>
            <p className="line-clamp-1">Hello, {currentUser}</p>
            <ChevronDown />
            {isExpand && (
              <div
                className="absolute w-[120px] top-full py-2 text-center right-0 border bg-[#3dc031] hover:bg-[#3be907] hover:text-[#ff3939] rounded-md px-2"
                onClick={handleOnClick}
              >
                Logout
              </div>
            )}
          </div>
        )}

        <Button className="hidden lg:flex shadow-custom items-center justify-between custom-bg2 custom-bg2:hover w-[190px]">
          <div className="flex items-center gap-1">
            <Heart size={20} />
            <span>Phim yêu thích</span>
          </div>
          <div className="bg-red-600 rounded-full px-[6px] py-[6px] ml-2.5">0</div>
        </Button>
      </div>
    </div>
  )
}

export default Header
