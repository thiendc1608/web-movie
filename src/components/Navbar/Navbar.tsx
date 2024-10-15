import { useEffect, useState } from 'react'
import { navLink } from '@/utils/constants'
import { NavLink } from 'react-router-dom'
import { useGetCategory } from '@/api'
import SubItem from './components/SubItem'
import { ChevronDown, Heart, AlignJustify } from 'lucide-react'
import { path } from '@/utils/path'
import { useGetCountry } from '@/api/country-api'
import { useAllDataGetApi } from '@/stores/useAllDataGetApi'
import Skeleton from 'react-loading-skeleton'
import { Search } from '../Header'
import './Navbar.css'
import Sidebar from './Sidebar/Sidebar'
import { useShowMenu } from '@/stores/useShowModal'

const Navbar = () => {
  const { categoryData, isLoading } = useGetCategory()
  const { countryData } = useGetCountry()
  const { setDataCategory, setDataCountry } = useAllDataGetApi()
  const [isShowCategory, setIsShowCategory] = useState(false)
  const [isShowCountry, setIsShowCountry] = useState(false)
  const { setIsShowMenu } = useShowMenu()

  useEffect(() => {
    if (categoryData) setDataCategory(categoryData.data)
    if (countryData) setDataCountry(countryData.data)
  }, [isLoading, categoryData, countryData])

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }} className="custom-page">
        <Skeleton
          height={50}
          width={111}
          count={7}
          containerClassName="flex-1 mt-[-4px]"
          inline={true}
          style={{ marginRight: '1px' }}
        />
      </div>
    )
  }

  return (
    <>
      <ul className="text-[#989898] hidden lg:flex list-none custom-page items-center justify-start text-[15px] font-normal transition duration-300">
        {navLink.map((nav) => (
          <>
            {nav.name === 'THỂ LOẠI' ? (
              <li
                key={nav.id}
                className="px-2.5 py-3.5 relative lg:flex min-w-[113px] justify-between items-center bg-[#000000] border-r-[0.5px] first:border-l-[0.5px] border-[#2e353f]"
                onMouseOver={() => setIsShowCategory(true)}
                onMouseOut={() => setIsShowCategory(false)}
              >
                <NavLink
                  to={`${nav.path}`}
                  className={({ isActive }) => (isActive ? 'text-[#ffff]' : 'text-[#989898]')}
                >
                  <div className=" hover:text-[#ff8a00]  cursor-pointer ">{nav.name}</div>
                </NavLink>
                <div className="absolute right-[8px] bottom-[15px]">
                  <ChevronDown size={20} />
                </div>
                {isShowCategory && <SubItem mainCategory={`/${path.THE_LOAI}`} data={categoryData?.data.items} />}
              </li>
            ) : (
              <>
                {nav.name === 'QUỐC GIA' ? (
                  <li
                    key={nav.id}
                    className="px-2.5 py-3.5 relative lg:flex min-w-[113px] justify-between items-center bg-[#000000] border-r-[0.5px] first:border-l-[0.5px] border-[#2e353f]"
                    onMouseOver={() => setIsShowCountry(true)}
                    onMouseOut={() => setIsShowCountry(false)}
                  >
                    <NavLink
                      to={`${nav.path}`}
                      className={({ isActive }) => (isActive ? 'text-[#ffff]' : 'text-[#989898]')}
                    >
                      <div className=" hover:text-[#ff8a00]  cursor-pointer ">{nav.name}</div>
                    </NavLink>
                    <div className="absolute right-[8px] bottom-[15px]">
                      <ChevronDown size={20} />
                    </div>
                    {isShowCountry && <SubItem mainCategory={`/${path.COUNTRY}`} data={countryData?.data.items} />}
                  </li>
                ) : (
                  <li
                    key={nav.id}
                    className="min-w-[113px] border-r-[0.5px] first:border-l-[0.5px] border-[#2e353f] text-center"
                  >
                    <NavLink
                      to={`${nav.path}`}
                      className={({ isActive }) => (isActive ? 'text-[#ffff]' : 'text-[#989898]')}
                    >
                      <div className="px-2.5 py-3.5 hover:text-[#ff8a00] bg-[#000000] cursor-pointer ">{nav.name}</div>
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </>
        ))}
      </ul>
      <div className="lg:hidden flex items-center justify-between text-[#a5a5a5] custom-page h-full">
        <button className="py-[9px] px-[10px] hover:bg-slate-800" onClick={() => setIsShowMenu(true)}>
          <AlignJustify size={30} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="hidden max-sm:flex items-center">
            <Search />
          </div>
          <div className="flex relative h-5 mr-1.5">
            <Heart size={26} />
            <span className="bg-red-700 rounded-full absolute text-sm px-1 transform -translate-y-full top-2 right-0 z-50">
              0
            </span>
          </div>
        </div>
      </div>
      <Sidebar />
    </>
  )
}

export default Navbar
