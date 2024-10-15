import { DetailFilmType } from '@/type'
import MovieCollectionItem from '../Home/MovieCollection/MovieCollectionItem'
import { useGetRelateFilm } from '@/api/detail-film'

interface RelateFilmProps {
  data: DetailFilmType
  isLoading: boolean
}

const RelateFilm = ({ data, isLoading }: RelateFilmProps) => {
  const category = data?.item?.category[data?.item?.category.length - 1].slug
  const { relateFilm } = useGetRelateFilm(data.item.slug, category)
  return (
    <div className="transition duration-300 mt-3">
      {relateFilm?.data && (
        <MovieCollectionItem
          titleMovie="Có thể phù hợp với bạn"
          data={relateFilm?.data}
          isNotShowSeeAll={true}
          countImageShow={12}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default RelateFilm
