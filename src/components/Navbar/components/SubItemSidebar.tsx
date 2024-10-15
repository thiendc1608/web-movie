import { useState } from 'react'
import { Categories } from '@/type'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useShowMenu } from '@/stores/useShowModal'

interface SubItemSidebarProps {
  mainCategory: string
  data: Categories
}

const SubItemSidebar = ({ mainCategory, data }: SubItemSidebarProps) => {
  const [itemTab, setItemTab] = useState('')
  const { setIsShowMenu } = useShowMenu()
  return (
    <ul className="absolute top-full left-0 bg-[#000c17] py-2 rounded-lg w-full h-screen z-50 overflow-y-scroll scroll-bar-custom">
      {data?.items?.map((item) => (
        <li
          key={item._id}
          className={cn(
            'pt-3 pr-6 pb-3 pl-14 truncate cursor-pointer text-[#989898] hover:text-white hover:border-r-2 rounded-r-md border-[#FF8A00] text-sm',
            itemTab === item._id && 'text-[#FF8A00]'
          )}
          onClick={(e) => {
            e.stopPropagation()
            setItemTab(item._id)
            setIsShowMenu(false)
          }}
        >
          <Link to={`${mainCategory}/${item.slug}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default SubItemSidebar
