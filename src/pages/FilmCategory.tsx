import { useEffect, useState } from 'react'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import TopView from '@/components/Home/TopView/TopView'
import { useGetFilmCategory } from '@/api/film-category'
import { useGetHomeData } from '@/api/home-api'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import Pagination from '@/components/Pagination/Pagination'

const FilmCategory = () => {
  const { homeData, isLoading } = useGetHomeData()
  const { filmCategory } = useParams()
  const { filmCategoryData, isLoading: isFilmCategory } = useGetFilmCategory(filmCategory ?? '')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [pageCurrent, setPageCurrent] = useState(1)
  const [searchParams] = useSearchParams()

  const categoryFilmEl = document.getElementById('category-film-scroll')

  useEffect(() => {
    categoryFilmEl?.scrollIntoView({
      inline: 'start',
      block: 'start',
      behavior: 'smooth',
    })
  }, [pathname, pageCurrent])

  useEffect(() => {
    const queries = Object.fromEntries(searchParams)
    queries.page = pageCurrent.toString()
    navigate({
      pathname: pathname,
      search: createSearchParams(queries).toString(),
    })
  }, [pageCurrent])

  return (
    <div id="category-film-scroll">
      {homeData?.data && <FilterFilm isNotShowSeeAll={false} data={homeData?.data} isLoading={isLoading} />}
      <div className="bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg min-h-screen relative">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="mb-3 mt-3">
            {filmCategoryData?.data && (
              <>
                <BreadcrumbFunction data={filmCategoryData?.data} isLoading={isFilmCategory} />
                <MovieCollectionItem
                  titleMovie={`Thể loại ${filmCategoryData?.data.titlePage}`}
                  data={filmCategoryData?.data}
                  isNotShowSeeAll={true}
                  countImageShow={filmCategoryData?.data.items.length}
                  isLoading={isFilmCategory}
                />
              </>
            )}
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
        {filmCategoryData?.data && (
          <Pagination
            totalCount={+filmCategoryData?.data.params.pagination.totalItems || 1}
            currentPage={pageCurrent}
            setPageCurrent={setPageCurrent}
            pageSize={+filmCategoryData?.data.params.pagination.totalItemsPerPage || 1}
          />
        )}
      </div>
    </div>
  )
}

export default FilmCategory
