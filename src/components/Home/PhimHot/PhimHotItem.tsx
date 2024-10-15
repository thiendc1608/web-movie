// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import '@/style.css'

// import required modules
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HomeListFilm, ListDataTypes } from '@/type'
import '@/components/Home/SlideFilm/SlideFilm.css'
import FilmItem from '@/components/FilmItem'
import '@/components/Home/MovieCollection/MovieCollection.css'
import FilmItemSkeleton from '@/components/Skeleton/FilmItemSkeleton'

interface PhimHotItemProps {
  data: ListDataTypes
  isLoading: boolean
}
const PhimHotItem = ({ data, isLoading }: PhimHotItemProps) => {
  if (isLoading) {
    return (
      <div className="flex gap-[10px]">
        <FilmItemSkeleton cards={6} />
      </div>
    )
  }
  return (
    <>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
        modules={[Navigation]}
        className="swiper-autoheight mySwiper"
        loop={true}
      >
        {data?.items?.map((item: HomeListFilm) => (
          <SwiperSlide key={item._id}>
            <FilmItem item={item} isNotShowSeeAll={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PhimHotItem
