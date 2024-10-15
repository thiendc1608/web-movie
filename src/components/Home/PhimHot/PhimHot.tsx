import { ListDataTypes } from '@/type'
import TitleMovie from '../TitleMovie'
import PhimHotItem from './PhimHotItem'

interface PhimHotProps {
  titleMovie: string
  data: ListDataTypes
  isLoading: boolean
}

const PhimHot = ({ titleMovie, data, isLoading }: PhimHotProps) => {
  return (
    <div className="custom-page pb-[3%] bg-[#151d25]">
      <TitleMovie titleMovie={titleMovie} isNotShowSeeAll={true} />
      <PhimHotItem data={data} isLoading={isLoading} />
    </div>
  )
}

export default PhimHot
