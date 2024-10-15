import { cn } from '@/lib/utils'
import { useAllDataGetApi } from '@/stores/useAllDataGetApi'
import { navLink } from '@/utils/constants'
import { path } from '@/utils/path'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SubItemSidebar from '../components/SubItemSidebar'
import { useShowMenu } from '@/stores/useShowModal'
import logo from '@/assets/images/logo.jpg'

const Sidebar = () => {
  const [selectTab, setSelectTab] = useState<number>(1)
  const [expandCategory, setExpandCategory] = useState<boolean>(false)
  const [expandCountry, setExpandCountry] = useState<boolean>(false)
  const { dataCategory, dataCountry } = useAllDataGetApi()
  const { isShowMenu, setIsShowMenu } = useShowMenu()

  return (
    <>
      <div className={cn('sidebar', isShowMenu ? 'close' : '')}>
        <div className="relative custom-bg rounded-tr-lg">
          <div className="flex items-center justify-between">
            <div className="logo">
              <img src={logo} alt="Logo" className="w-[60px] h-[60px] rounded-md object-cover" />
            </div>
            <div className="mr-5">
              <span className="logo-text">
                Cuồng <span className="text-primary">Phim</span>
              </span>
            </div>
            <button className="text-black mr-1.5 rounded-full x-button" onClick={() => setIsShowMenu(false)}>
              <X size={30} />
            </button>
          </div>
        </div>
        <div className="h-full overflow-y-scroll scroll-bar-custom">
          <ul className="m-1">
            {navLink.map((nav) => (
              <>
                {nav.name === 'THỂ LOẠI' ? (
                  <li
                    className={cn(
                      'relative flex items-center gap-4 py-3 px-6 h-10 cursor-pointer justify-between select-none hover:text-[#FF8A00]',
                      nav.id === selectTab && 'text-[#FF8A00]'
                    )}
                    onClick={() => {
                      setSelectTab(nav.id)
                      setExpandCategory(!expandCategory)
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <nav.Icon size={20} />
                      <span className="text-sm">{nav.name}</span>
                    </div>
                    <div onClick={() => setExpandCategory(!expandCategory)}>
                      {expandCategory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    {expandCategory && (
                      <SubItemSidebar mainCategory={`/${path.THE_LOAI}`} data={dataCategory?.data.items} />
                    )}
                  </li>
                ) : (
                  <>
                    {nav.name === 'QUỐC GIA' ? (
                      <li
                        className={cn(
                          'relative flex items-center gap-4 py-3 px-6 h-10 cursor-pointer justify-between hover:text-[#FF8A00] select-none',
                          nav.id === selectTab && 'text-[#FF8A00]'
                        )}
                        onClick={() => {
                          setSelectTab(nav.id)
                          setExpandCountry(!expandCountry)
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <nav.Icon size={20} />
                          <span className="text-sm">{nav.name}</span>
                        </div>
                        {expandCountry ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        {expandCountry && (
                          <SubItemSidebar mainCategory={`/${path.COUNTRY}`} data={dataCountry?.data.items} />
                        )}
                      </li>
                    ) : (
                      <li key={nav.id} className={cn(nav.id === selectTab && 'text-[#FF8A00]')}>
                        <Link
                          to={nav.path}
                          className="flex items-center gap-4 py-3 px-6 h-10 hover:text-[#FF8A00] select-none"
                          onClick={() => {
                            setSelectTab(nav.id)
                            setIsShowMenu(false)
                            setExpandCategory(false)
                            setExpandCountry(false)
                          }}
                        >
                          <nav.Icon size={20} />
                          <span className="text-sm">{nav.name}</span>
                        </Link>
                      </li>
                    )}
                  </>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={cn(
          'bg-white z-[5] absolute top-0 left-0 w-full h-full visible lg:invisible md:opacity-0 transition duration-300 opacity-100',
          isShowMenu ? '' : 'invisible'
        )}
        onClick={() => setIsShowMenu(false)}
      ></div>
    </>
  )
}

export default Sidebar
