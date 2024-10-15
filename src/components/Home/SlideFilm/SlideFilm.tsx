import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { CalendarDays, Clock, Languages, Play, Tv } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import required modules

import '@/style.css'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { HomeListFilm, ListItemsType } from '@/type'
import { Link } from 'react-router-dom'

interface SlideFilmProps {
  data: ListItemsType
  isLoading: boolean
}
const SlideFilm = ({ data, isLoading }: SlideFilmProps) => {
  const dataStored = localStorage.getItem('urlDomain')
  const urlDomainImage = dataStored ? JSON.parse(dataStored).state.urlDomainImage : ''
  const [isHoverImage, setIsHoverImage] = React.useState(false)
  const [isHoverPlay, setIsHoverPlay] = React.useState(false)

  if (isLoading) {
    return <Skeleton height={720} width={1260} />
  }

  return (
    <div className="mt-[3px] !rounded-lg swiper-container">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper relative group hover:cursor-pointer overflow-hidden "
      >
        {data?.slice(0, 10).map((item: HomeListFilm) => (
          <SwiperSlide key={item._id}>
            <Link to={`/chi-tiet-phim/${item.slug}`}>
              <div
                className="w-full"
                onMouseEnter={() => {
                  setIsHoverImage(true)
                }}
                onMouseLeave={() => {
                  setIsHoverImage(false)
                  setIsHoverPlay(false)
                }}
              >
                <LazyLoadImage
                  effect="blur"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: {
                      transitionDelay: '0.2s',
                    },
                  }}
                  src={`${urlDomainImage}/uploads/movies/${item.thumb_url.replace('thumb', 'poster')}`}
                  alt={`${item.slug}`}
                  className="h-64 sm:h-80 md:h-96 lg:h-[720px] w-full object-cover rounded-lg overflow-hidden"
                />
              </div>
              <div className="absolute h-full w-full top-0 left-0 rounded-lg pointer-events-none group-hover:bg-[#00000026] tw-black-backdrop transition duration-700"></div>
              {(isHoverImage || isHoverPlay) && (
                <>
                  <div
                    className="absolute top-1/3 -translate-x-1/3 md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2"
                    onMouseEnter={() => {
                      setIsHoverPlay(true)
                    }}
                  >
                    <div className="bg-[#eb5e33] md:w-16 md:h-16 w-10 h-10 rounded-full flex items-center justify-center z-10">
                      <Play color="#fff" size={36} />
                    </div>
                  </div>
                </>
              )}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-[5%] max-w-[200px] md:max-w-md text-left"
                onMouseEnter={() => {
                  setIsHoverImage(true)
                }}
                onMouseLeave={() => {
                  setIsHoverImage(false)
                }}
              >
                <h2 className="text-[#eb5e33] font-black tracking-wide text-xl md:text-5xl tw-multiline-ellipsis-3 md:tw-multiline-ellipsis-2">
                  {item.origin_name}
                </h2>
                <p className="mt-2 text-white font-semibold text-base md:text-2xl">{item.name}</p>
                <div className="hidden md:flex item-center gap-3">
                  <p className="text-[#a5a5a5] hidden md:flex text-lg items-center gap-2 mt-2">
                    <CalendarDays color="yellow" size={24} />
                    <span>{parseInt(item.year)}</span>
                  </p>
                  <p className="text-[#a5a5a5] hidden md:flex text-lg items-center gap-2 mt-2">
                    <Clock color="yellow" size={24} />
                    <span>{item.time.split('/')[0]}</span>
                  </p>
                </div>
                <div className="hidden md:flex item-center gap-3 mt-2">
                  <Languages color="yellow" size={24} />
                  <p className="text-[#a5a5a5] hidden md:flex text-lg items-center gap-2">Ngôn ngữ: {item.lang}</p>
                </div>
                <div className="hidden md:flex item-center gap-3 mt-2">
                  <Tv color="yellow" size={24} />
                  <p className="text-[#a5a5a5] hidden md:flex text-lg items-center gap-2">Chất lượng: {item.quality}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SlideFilm
