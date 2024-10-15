import React, { useEffect, useState } from 'react'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { createSearchParams, Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { House, Flame, Siren } from 'lucide-react'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import TopView from '@/components/Home/TopView/TopView'
import { useGetCountryFilm } from '@/api/country-film'
import { useGetHomeData } from '@/api/home-api'
import Pagination from '@/components/Pagination/Pagination'

const CountryFilm = () => {
  const { homeData, isLoading } = useGetHomeData()
  const { countryFilm } = useParams()
  const { countryFilmData, isLoading: isCountryFilm } = useGetCountryFilm(countryFilm ?? '')
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
            <div className="flex items-center gap-2 text-ellipsis overflow-hidden whitespace-nowrap">
              <Link to={'/'} className="cursor-pointer text-[#1890ff] flex items-center">
                <House />
                <span>Trang chủ</span>
              </Link>
              <div className="flex text-[#b0e8e5] items-center">
                <Flame />
                <span>{countryFilmData?.data.breadCrumb[0].name}</span>
              </div>
              <div className="text-[#b0e8e5] flex items-center">
                <Siren />
                <span>{countryFilmData?.data.breadCrumb[1].name}</span>
              </div>
            </div>
            <MovieCollectionItem
              titleMovie={`Quốc Gia ${countryFilmData?.data.titlePage}`}
              data={countryFilmData?.data.items}
              isNotShowSeeAll={true}
              countImageShow={countryFilmData?.data.items.length}
              isLoading={isCountryFilm}
            />
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
        <Pagination
          totalCount={+countryFilmData?.data.params.pagination.totalItems || 1}
          currentPage={pageCurrent}
          setPageCurrent={setPageCurrent}
          pageSize={+countryFilmData?.data.params.pagination.totalItemsPerPage || 1}
        />
      </div>
    </>
  )
}

export default CountryFilm
