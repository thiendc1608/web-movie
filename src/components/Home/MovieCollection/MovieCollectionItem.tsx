// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import '@/style.css'
import '@/components/Home/SlideFilm/SlideFilm.css'
import FilmItem from '@/components/FilmItem'
import TitleMovie from '../TitleMovie'
import Skeleton from 'react-loading-skeleton'
import FilmItemSkeleton from '@/components/Skeleton/FilmItemSkeleton'
import { useLocation } from 'react-router-dom'
import { HomeListFilm, ListDataTypes } from '@/type'

interface MovieCollectionItemProps {
  titleMovie: string
  data: ListDataTypes
  isNotShowSeeAll: boolean
  countImageShow?: number
  isLoading: boolean
}
const MovieCollectionItem = ({
  titleMovie,
  data,
  isNotShowSeeAll,
  countImageShow,
  isLoading,
}: MovieCollectionItemProps) => {
  const location = useLocation()
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton height={36} width={67.27} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:mr-5 mb-5">
          <FilmItemSkeleton cards={location.pathname ? 24 : 12} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <TitleMovie titleMovie={titleMovie} isNotShowSeeAll={isNotShowSeeAll} />
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:mr-5 mb-5">
        {data?.items.slice(0, countImageShow).map((item: HomeListFilm) => (
          <FilmItem key={item._id} item={item} isNotShowSeeAll={isNotShowSeeAll} />
        ))}
      </div>
    </div>
  )
}

export default MovieCollectionItem
