import TopViewItem from './TopViewItem'
import TitleTopView from './TitleTopView'
import { useTopViewStore } from '@/stores/useTopViewStore'

interface TopViewProps {
  countImageShow: number
}
const TopView = ({ countImageShow }: TopViewProps) => {
  const { topViewData } = useTopViewStore()
  return (
    <div className="mb-5 min-h-screen cursor-pointer">
      <TitleTopView titleMovie="TOP XEM NHIỀU" />
      <div className="mt-2 relative">
        <TopViewItem data={topViewData} countImageShow={countImageShow} />
      </div>
    </div>
  )
}

export default TopView
