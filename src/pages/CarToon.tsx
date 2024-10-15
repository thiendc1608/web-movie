import { useEffect, useState } from 'react'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import TopView from '@/components/Home/TopView/TopView'
import { useGetCarToonData } from '@/api/cartoon'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import { useGetHomeData } from '@/api/home-api'
import Pagination from '@/components/Pagination/Pagination'

const CarToon = () => {
  const { homeData, isLoading } = useGetHomeData()
  const { carToonData, isLoading: isCartoonData } = useGetCarToonData()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [pageCurrent, setPageCurrent] = useState(1)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const queries = Object.fromEntries(searchParams)
    queries.page = pageCurrent.toString()
    navigate({
      pathname: pathname,
      search: createSearchParams(queries).toString(),
    })
  }, [pageCurrent])

  return (
    <>
      <FilterFilm isNotShowSeeAll={false} data={homeData?.data?.items} isLoading={isLoading} />
      <div className="bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg min-h-screen relative">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="mb-3 mt-3">
            <BreadcrumbFunction data={carToonData?.data.breadCrumb} isLoading={isCartoonData} />
            <MovieCollectionItem
              titleMovie={carToonData?.data.titlePage}
              data={carToonData?.data.items}
              isNotShowSeeAll={true}
              countImageShow={carToonData?.data.items.length}
              isLoading={isCartoonData}
            />
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen  cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
        <Pagination
          totalCount={+carToonData?.data.params.pagination.totalItems || 1}
          currentPage={pageCurrent}
          setPageCurrent={setPageCurrent}
          pageSize={+carToonData?.data.params.pagination.totalItemsPerPage || 1}
        />
      </div>
    </>
  )
}

export default CarToon
