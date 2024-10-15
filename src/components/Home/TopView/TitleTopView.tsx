import { useEffect, useState } from 'react'
import '@/components/Home/TopView/TopView.css'
import { cn } from '@/lib/utils'
import { useGetTopViewData } from '@/api/top-view'
import { useTopViewStore } from '@/stores/useTopViewStore'
import Skeleton from 'react-loading-skeleton'

interface TitleMovieProps {
  titleMovie: string
}

const stringTime: {
  id: number
  name: string
}[] = [
  {
    id: 1,
    name: 'Ngày',
  },
  {
    id: 2,
    name: 'Tuần',
  },
  {
    id: 3,
    name: 'Tháng',
  },
]

const TitleTopView = ({ titleMovie }: TitleMovieProps) => {
  const [activeTab, setActiveTab] = useState(1)
  const { topViewData: dayData, isLoading } = useGetTopViewData('_id')
  const { topViewData: weekData } = useGetTopViewData('modified.time')
  const { topViewData: monthData } = useGetTopViewData('year')
  const { setTopViewData } = useTopViewStore()
  useEffect(() => {
    if (activeTab === 1) setTopViewData(dayData?.data)
    if (activeTab === 2) setTopViewData(weekData?.data)
    if (activeTab === 3) setTopViewData(monthData?.data)
  }, [isLoading, activeTab])

  if (isLoading) {
    return <Skeleton height={1600} width={381.53} className="mt-[10px]" />
  }

  return (
    <div className="!border-b !border-[#1e2732] mb-3">
      <div className="flex items-center justify-between">
        <div className="sectionTitle-custom border-b py-3">
          <span className="font-extrabold tracking-wider capitalize whitespace-nowrap">{titleMovie}</span>
        </div>
        <div className="flex items-center ">
          {stringTime.map((time) => (
            <div key={time.id}>
              <button
                className={cn('trending-button', activeTab === time.id ? 'activetrending' : '')}
                onClick={() => setActiveTab(time.id)}
              >
                {time.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TitleTopView
