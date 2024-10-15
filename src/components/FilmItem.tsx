import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { HomeListFilm } from '@/type'
import { useHomeStore } from '@/stores/useHomeStore'
import '@/components/Home/MovieCollection/MovieCollection.css'
import { cn } from '@/lib/utils'

interface FilmItemProps {
  item: HomeListFilm
  isNotShowSeeAll: boolean
}

const FilmItem = ({ item, isNotShowSeeAll }: FilmItemProps) => {
  let dataStored = JSON.parse(localStorage.getItem('urlDomain'))
  const urlDomainImage = dataStored.state.urlDomainImage

  return (
    <div className="h-[325px] card-custom flex flex-col bg-[#202a34] group">
      <Link to={`/chi-tiet-phim/${item.slug}`} className="h-full">
        <div className="h-5/6 relative overflow-hidden rounded-t-lg">
          <LazyLoadImage
            effect="blur"
            wrapperProps={{
              // If you need to, you can tweak the effect transition using the wrapper style.
              style: {
                transitionDelay: '0.2s',
              },
            }}
            src={`${urlDomainImage}/uploads/movies/${item.thumb_url}`}
            alt={`${item.slug}`}
            className="h-full w-full object-cover rounded-t-lg group-hover:scale-110 transition duration-500"
          />
          <div
            className={cn(`${isNotShowSeeAll ? 'cardItemQualangMiniSlider' : 'cardItemQualang'}`)}
          >{`${item.quality}+${item.lang}`}</div>
          <div className="addOn-custom">{item.sub_docquyen ? 'VietSub độc quyền' : item.episode_current}</div>
        </div>
        <div className="mt-1">
          <div className="text-center mx-3" aria-label={item.name}>
            <h3 className="text-[#e6920e] truncate font-medium mb-1/2">{item.name}</h3>
            <p className="text-[#8a9eaf] truncate text-sm mb-1">{item.origin_name}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FilmItem
