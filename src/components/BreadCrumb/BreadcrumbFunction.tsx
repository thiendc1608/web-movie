import { useEffect, useState } from 'react'
import { DetailFilmType, ListDataTypes } from '@/type'
import { Flame, House, Siren } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Grip } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'

interface BreadcrumbProps {
  data: ListDataTypes | DetailFilmType
  isLoading: boolean
}

const BreadcrumbFunction = ({ data, isLoading }: BreadcrumbProps) => {
  const location = useLocation()
  const [dataBreadcrumb, setDataBreadcrumb] = useState<string[]>([])
  useEffect(() => {
    if (data?.breadCrumb.length > 0) {
      const { 0: first, [data?.breadCrumb.length - 1]: last } = data.breadCrumb
      if (location.pathname.includes('chi-tiet-phim')) {
        setDataBreadcrumb([first.name, 'Chi tiết phim', last.name])
      } else if (location.pathname.includes('sort')) {
        setDataBreadcrumb(['Lọc phim', last.name])
      } else {
        setDataBreadcrumb([first.name, last.name])
      }
    }
  }, [isLoading, data, location.pathname])

  if (isLoading) {
    return <Skeleton height={24} width={236.57} />
  }

  return (
    <div className="flex items-center gap-2 text-ellipsis overflow-hidden whitespace-nowrap mt-6 lg:text-base text-sm">
      <Link to={'/'} className="cursor-pointer text-[#1890ff] flex items-center">
        <House />
        <span>Trang chủ</span>
      </Link>
      <div className="flex text-[#b0e8e5] items-center">
        <Flame />
        <span className="ml-1">{dataBreadcrumb.length > 0 ? dataBreadcrumb[0] : ''}</span>
      </div>
      {dataBreadcrumb.length === 3 ? (
        <div className="flex text-[#b0e8e5] items-center">
          <Grip />
          <span className="ml-1">{dataBreadcrumb.length > 0 ? dataBreadcrumb[1] : ''}</span>
        </div>
      ) : (
        <div className="text-[#b0e8e5] flex items-center">
          <Siren />
          <span className="ml-1">{dataBreadcrumb.length > 0 ? dataBreadcrumb[1] : ''}</span>
        </div>
      )}
    </div>
  )
}

export default BreadcrumbFunction
