import TopViewItem from './TopViewItem'
import TitleTopView from './TitleTopView'
import { useState } from 'react'
import { ListDataTypes } from '@/type'

interface TopViewProps {
  countImageShow: number
}
const TopView = ({ countImageShow }: TopViewProps) => {
  const [topViewData, setTopViewData] = useState<ListDataTypes>()
  return (
    <div className="mb-5 min-h-screen cursor-pointer">
      <TitleTopView titleMovie="TOP XEM NHIỀU" setTopViewData={setTopViewData} />
      <div className="mt-2 relative">
        {topViewData && <TopViewItem data={topViewData} countImageShow={countImageShow} />}
      </div>
    </div>
  )
}

export default TopView
