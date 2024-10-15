import { useEffect, useState } from 'react'
import { useGetRelateFilm } from '@/api/detail-film'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import TopView from '@/components/Home/TopView/TopView'
import { useQueryString } from '@/utils/utils'
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { TriangleAlert } from 'lucide-react'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import { useFilterStatus } from '@/stores/useFilterStatus'
import { useGetHomeData } from '@/api/home-api'
import Skeleton from 'react-loading-skeleton'
import Pagination from '@/components/Pagination/Pagination'

const FilterFilmPage = () => {
  const { homeData, isLoading } = useGetHomeData()
  const queryString = useQueryString()
  const { listFilm } = useParams()
  const { relateFilm, isLoading: isRelateFilm } = useGetRelateFilm(
    `${listFilm}`,
    queryString.category,
    queryString.country,
    queryString.year,
    queryString.sort_field
  )

  const { listMovie, listCategory, listCountry, listYear } = useFilterStatus()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [pageCurrent, setPageCurrent] = useState(1)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  useEffect(() => {
    const queries = Object.fromEntries(searchParams)
    queries.page = pageCurrent.toString()
    navigate({
      pathname: pathname,
      search: createSearchParams(queries).toString(),
    })
  }, [pageCurrent])

  return (
    <div>
      {homeData?.data && <FilterFilm isNotShowSeeAll={false} data={homeData?.data} isLoading={isLoading} />}
      <div className="bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg relative">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="mb-3 mt-3">
            {relateFilm?.data && <BreadcrumbFunction data={relateFilm?.data} isLoading={isRelateFilm} />}
            {relateFilm?.data && relateFilm?.data?.items.length > 0 ? (
              <MovieCollectionItem
                titleMovie={`Lọc phim: ${listMovie} ${listCategory === 'Chọn tất cả' ? '' : listCategory} ${
                  listCountry === 'Chọn tất cả' ? '' : listCountry
                } ${listYear === 'Chọn tất cả' ? '' : listYear}`}
                data={relateFilm?.data}
                isNotShowSeeAll={true}
                countImageShow={relateFilm?.data.items.length}
                isLoading={isLoading}
              />
            ) : (
              <>
                {isRelateFilm ? (
                  <Skeleton height={28} width={923} />
                ) : (
                  <div className="text-center text-white text-lg mt-5">
                    <div className="flex gap-2 lg:items-center items-start justify-center">
                      <TriangleAlert color="yellow" />
                      <h1>Rất tiếc, chúng tôi không có phim cho mục này...</h1>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
        {relateFilm?.data && (
          <Pagination
            totalCount={+relateFilm?.data.params.pagination.totalItems || 1}
            currentPage={pageCurrent}
            setPageCurrent={setPageCurrent}
            pageSize={+relateFilm?.data.params.pagination.totalItemsPerPage || 1}
          />
        )}
      </div>
    </div>
  )
}

export default FilterFilmPage
