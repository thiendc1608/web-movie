import MovieCollectionItem from './MovieCollectionItem'
import TopView from '../TopView/TopView'
import { useGetFilmSeries } from '@/api/film-series'
import { useGetMovieData } from '@/api/movies'
import { useGetTVShowsData } from '@/api/tv-shows'
import { useGetCarToonData } from '@/api/cartoon'

const MovieCollection = () => {
  const { filmSeries, isLoading: isFilmSeriesLoading } = useGetFilmSeries()
  const { movieData, isLoading: isMovieData } = useGetMovieData()
  const { tvShowsData, isLoading: isTVShowsData } = useGetTVShowsData()
  const { carToonData, isLoading: isCarToonData } = useGetCarToonData()

  return (
    <div className="custom-page pb-[3%] bg-[#151d25]">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="lg:w-3/4">
          {filmSeries?.data && (
            <MovieCollectionItem
              titleMovie="Phim Bộ"
              data={filmSeries?.data}
              countImageShow={12}
              isLoading={isFilmSeriesLoading}
              isNotShowSeeAll={true}
            />
          )}
          {movieData?.data && (
            <MovieCollectionItem
              titleMovie="Phim Lẻ"
              data={movieData?.data}
              countImageShow={12}
              isLoading={isMovieData}
              isNotShowSeeAll={true}
            />
          )}
          {tvShowsData?.data && (
            <MovieCollectionItem
              titleMovie="TV SHOWS"
              data={tvShowsData?.data}
              countImageShow={12}
              isLoading={isTVShowsData}
              isNotShowSeeAll={true}
            />
          )}
          {carToonData?.data && (
            <MovieCollectionItem
              titleMovie="Hoạt hình"
              data={carToonData?.data}
              countImageShow={12}
              isLoading={isCarToonData}
              isNotShowSeeAll={true}
            />
          )}
        </div>
        <div className="w-full lg:w-1/3">
          <TopView countImageShow={filmSeries?.data?.items.length ?? 0} />
        </div>
      </div>
    </div>
  )
}

export default MovieCollection
