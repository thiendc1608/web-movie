import React from 'react'
import './Login.css'
import { X } from 'lucide-react'
import FormLogin from './FormLogin'
import { FaFacebookF } from 'react-icons/fa'
import { TiSocialGooglePlus } from 'react-icons/ti'
import { cn } from '@/lib/utils'
import FormRegister from './FormRegister'
import { useSelectTab, useShowModal } from '@/stores/useShowModal'
import { FacebookAuth, GoogleAuth } from '../firebase/firebase'
import { useUserStore } from '@/stores/useUserStore'

const Login = () => {
  const { selectTab, setSelectTab } = useSelectTab()
  const { setIsShowModal } = useShowModal()
  const { setUser, setIsLogin, setToken } = useUserStore()

  const FacebookAuthButtonClicked = async () => {
    const userInfo = await FacebookAuth()
    console.log(userInfo)

    if (userInfo?.user.displayName) {
      console.log('render')
      setIsShowModal(false, null)
      setIsLogin(true)
      setUser(userInfo?.user.displayName)
      setToken(userInfo?.user.accessToken)
    }
  }

  const GoogleAuthButtonClicked = async () => {
    const user = await GoogleAuth()

    if (user?.user.displayName) {
      setIsShowModal(false, null)
      setIsLogin(true)
      setUser(user?.user.displayName)
      setToken(user?.user.accessToken)
    }
  }

  return (
    <div className="w-[500px] px-8 py-4 custom-bg-login flex flex-col relative" onClick={(e) => e.stopPropagation()}>
      <span className="absolute top-4 right-4 cursor-pointer hover:text-red-500">
        <X size={30} />
      </span>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex-none w-2/3 mt-6">
          <p className="flex-none css-tv03ov mt-6 text-center">
            Trải nghiệm xem phim với hàng nghìn giờ phim bom tấn Hollywood, phim Châu Á và phim Việt Nam ăn khách.
          </p>
          <div className="flex-none">
            <button
              className={cn(
                'p-4 select-none text-[16px] leading-6',
                selectTab === 'Login' ? 'border-b-4 border-solid border-[#1674ead9]' : ''
              )}
              onClick={() => setSelectTab('Login')}
            >
              Sign in
            </button>
            <button
              className={cn(
                'p-4 select-none text-[16px] leading-6',
                selectTab === 'Register' ? 'border-b-4 border-solid border-[#1674ead9]' : ''
              )}
              onClick={() => setSelectTab('Register')}
            >
              New Account
            </button>
          </div>
        </div>
        {selectTab === 'Login' ? <FormLogin /> : <FormRegister />}
        <div className="flex items-center w-full gap-[10px]">
          <span className="flex-auto border-b w-full border-solid border-[#ffffff1f]"></span>
          <span className="text-nowrap select-none font-bold text-[15px]">hoặc kết nối tài khoản</span>
          <span className="flex-auto border-b w-full border-solid border-[#ffffff1f]"></span>
        </div>
        <div className="flex gap-3">
          <div
            className="w-10 h-10 rounded-full border-[1px] border-[#1674ead9] border-solid flex items-center justify-center cursor-pointer hover:bg-white"
            onClick={FacebookAuthButtonClicked}
          >
            <FaFacebookF size={20} color="#1668EA" />
          </div>
          <div
            className="w-10 h-10 rounded-full border-[1px] border-[#e34133] border-solid flex items-center justify-center cursor-pointer hover:bg-white"
            onClick={GoogleAuthButtonClicked}
          >
            <TiSocialGooglePlus size={30} color="#e34133" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
