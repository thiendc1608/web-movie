import { useEffect, useState } from 'react'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { useGetFilmSeries } from '@/api/film-series'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import TopView from '@/components/Home/TopView/TopView'
import { useGetHomeData } from '@/api/home-api'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import Pagination from '@/components/Pagination/Pagination'

const FilmSeries = () => {
  const { homeData, isLoading } = useGetHomeData()
  const { filmSeries, isLoading: isFilmSeriesLoading } = useGetFilmSeries()
  const { pathname } = useLocation()
  const [pageCurrent, setPageCurrent] = useState(1)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

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
      <div className="bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg  min-h-screen relative">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="mb-3 mt-3">
            <BreadcrumbFunction data={filmSeries?.data.breadCrumb} isLoading={isFilmSeriesLoading} />
            <MovieCollectionItem
              titleMovie={filmSeries?.data.titlePage}
              data={filmSeries?.data.items}
              isNotShowSeeAll={true}
              countImageShow={filmSeries?.data.items.length}
              isLoading={isFilmSeriesLoading}
            />
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
        <Pagination
          totalCount={+filmSeries?.data.params.pagination.totalItems || 1}
          currentPage={pageCurrent}
          setPageCurrent={setPageCurrent}
          pageSize={+filmSeries?.data.params.pagination.totalItemsPerPage || 1}
        />
      </div>
    </>
  )
}

export default FilmSeries
