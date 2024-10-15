import { useEffect, useState } from 'react'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import TopView from '@/components/Home/TopView/TopView'
import { useGetMovieData } from '@/api/movies'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import { useGetHomeData } from '@/api/home-api'
import Pagination from '@/components/Pagination/Pagination'

const Movie = () => {
  const { movieData, isLoading: isMovieData } = useGetMovieData()
  const { homeData, isLoading } = useGetHomeData()
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
      {homeData?.data && <FilterFilm isNotShowSeeAll={false} data={homeData?.data} isLoading={isLoading} />}
      <div className="relative bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg min-h-screen">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="mb-3 mt-3">
            {movieData?.data && (
              <>
                <BreadcrumbFunction data={movieData?.data} isLoading={isMovieData} />
                <MovieCollectionItem
                  titleMovie={movieData?.data.titlePage}
                  data={movieData?.data}
                  isNotShowSeeAll={true}
                  countImageShow={movieData?.data.items.length}
                  isLoading={isMovieData}
                />
              </>
            )}
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen  cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
        <Pagination
          totalCount={+movieData?.data.params.pagination.totalItems || 1}
          currentPage={pageCurrent}
          setPageCurrent={setPageCurrent}
          pageSize={+movieData?.data.params.pagination.totalItemsPerPage || 1}
        />
      </div>
    </>
  )
}

export default Movie
