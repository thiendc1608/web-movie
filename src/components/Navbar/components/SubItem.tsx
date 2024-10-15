import React from 'react'
import { Categories } from '@/type'
import { Link } from 'react-router-dom'
import { path } from '@/utils/path'

interface SubItemProps {
  mainCategory: string
  data: Categories
}
const SubItem = ({ mainCategory, data }: SubItemProps) => {
  return (
    <div className="absolute top-full left-0 bg-[#1f3d58] shadow-custom py-2 rounded-lg w-96 z-50">
      <div className="grid grid-cols-3">
        {data?.map((item) => (
          <div
            key={item._id}
            className="p-2 truncate cursor-pointer text-[#989898] hover:text-white hover:border-r-2 rounded-r-md border-[#3ddbf0]"
          >
            <Link to={`${mainCategory}/${item.slug}`}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubItem
