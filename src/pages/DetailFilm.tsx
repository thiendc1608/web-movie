import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { useParams } from 'react-router-dom'
import TopView from '@/components/Home/TopView/TopView'
import { useGetDetailFilm } from '@/api/detail-film'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import DetailFilmItem from '@/components/DetailFilm/DetailFilmItem'
import { useGetHomeData } from '@/api/home-api'

const DetailFilm = () => {
  const { filmName } = useParams()
  const { detailFilm, isLoading: isDetailFilm } = useGetDetailFilm(filmName ?? '')
  const { homeData, isLoading } = useGetHomeData()

  return (
    <>
      <FilterFilm isNotShowSeeAll={false} data={homeData?.data?.items} isLoading={isLoading} />
      <div className="bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="my-3">
            <BreadcrumbFunction data={detailFilm?.data.breadCrumb} isLoading={isDetailFilm} />
          </div>
          <DetailFilmItem data={detailFilm?.data.item} isLoading={isDetailFilm} />
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen  cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailFilm
