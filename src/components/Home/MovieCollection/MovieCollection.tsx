import React from 'react'
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
          <MovieCollectionItem
            titleMovie="Phim Bộ"
            data={filmSeries?.data?.items}
            countImageShow={12}
            isLoading={isFilmSeriesLoading}
          />
          <MovieCollectionItem
            titleMovie="Phim Lẻ"
            data={movieData?.data?.items}
            countImageShow={12}
            isLoading={isMovieData}
          />
          <MovieCollectionItem
            titleMovie="TV SHOWS"
            data={tvShowsData?.data?.items}
            countImageShow={12}
            isLoading={isTVShowsData}
          />
          <MovieCollectionItem
            titleMovie="Hoạt hình"
            data={carToonData?.data?.items}
            countImageShow={12}
            isLoading={isCarToonData}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <TopView countImageShow={filmSeries?.data?.items.length ?? 0} />
        </div>
      </div>
    </div>
  )
}

export default MovieCollection
