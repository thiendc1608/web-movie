import { useEffect, useState } from 'react'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import TopView from '@/components/Home/TopView/TopView'
import { useGetTVShowsData } from '@/api/tv-shows'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import { useGetHomeData } from '@/api/home-api'
import Pagination from '@/components/Pagination/Pagination'

const TVShows = () => {
  const { tvShowsData, isLoading: isTVShowsData } = useGetTVShowsData()
  const { homeData, isLoading } = useGetHomeData()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [pageCurrent, setPageCurrent] = useState(1)
  const [searchParams] = useSearchParams()

  const tvShowsEl = document.getElementById('tv-shows-scroll')

  useEffect(() => {
    tvShowsEl?.scrollIntoView({
      inline: 'start',
      block: 'start',
      behavior: 'smooth',
    })
  }, [pathname, pageCurrent, searchParams])

  useEffect(() => {
    const queries = Object.fromEntries(searchParams)
    queries.page = pageCurrent.toString()
    navigate({
      pathname: pathname,
      search: createSearchParams(queries).toString(),
    })
  }, [pageCurrent])

  return (
    <div id="tv-shows-scroll">
      {homeData?.data && <FilterFilm isNotShowSeeAll={false} data={homeData?.data} isLoading={isLoading} />}
      <div className="bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg min-h-screen relative">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="mb-3 mt-3">
            {tvShowsData?.data && (
              <>
                <BreadcrumbFunction data={tvShowsData?.data} isLoading={isTVShowsData} />
                <MovieCollectionItem
                  titleMovie={tvShowsData?.data.titlePage}
                  data={tvShowsData?.data}
                  isNotShowSeeAll={true}
                  countImageShow={tvShowsData?.data.items.length}
                  isLoading={isTVShowsData}
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
        {tvShowsData?.data && (
          <Pagination
            totalCount={+tvShowsData?.data.params.pagination.totalItems || 1}
            currentPage={pageCurrent}
            setPageCurrent={setPageCurrent}
            pageSize={+tvShowsData?.data.params.pagination.totalItemsPerPage || 1}
          />
        )}
      </div>
    </div>
  )
}

export default TVShows
