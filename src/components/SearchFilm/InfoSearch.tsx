import { useEffect } from 'react'
import { ListDataTypes } from '@/type'
import TopViewItem from '../Home/TopView/TopViewItem'
import { useShowResultSearch } from '@/stores/useShowModal'

interface InfoSearchProps {
  data: ListDataTypes
  query: string
}
const InfoSearch = ({ data, query }: InfoSearchProps) => {
  const { isShowResult, setIsShowResult } = useShowResultSearch()

  useEffect(() => {
    const handleClickOutOptions = (e: Event) => {
      const displayResultSearch = document.getElementById('display-result-search')
      if (e.target instanceof Node && !displayResultSearch?.contains(e.target)) setIsShowResult(false)
    }
    document.addEventListener('click', handleClickOutOptions)
    return () => {
      document.removeEventListener('click', handleClickOutOptions)
    }
  }, [])
  return (
    <>
      {isShowResult && (
        <ul
          id="display-result-search"
          className="scroll-bar-custom border-[1px] border-[#684808] flex flex-col max-h-[300px] sm:max-h-[400px] md:max-h-[470px] lg:max-h-[550px] xl:max-h-[650px]"
        >
          <div className="px-2 md:px-4 py-2 text-sm font-medium text-gray-400 capitalize sm:px-6 sm:text-base md:text-lg">
            <p className="truncate">
              Bạn đang tìm:
              <span className="text-[#d50ac1]"> {query}</span>
            </p>
          </div>
          <TopViewItem data={data} countImageShow={data?.items?.length} />
        </ul>
      )}
    </>
  )
}

export default InfoSearch
