import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { useEffect, useState } from 'react'
import { useGetHomeData } from '@/api/home-api'
import MovieCollection from '@/components/Home/MovieCollection/MovieCollection'
import { useHomeStore } from '@/stores/useHomeStore'
import PhimHot from '@/components/Home/PhimHot/PhimHot'

const Home = () => {
  const { homeData, isLoading } = useGetHomeData()
  const { setURL } = useHomeStore()

  useEffect(() => {
    if (homeData) setURL(homeData?.data.APP_DOMAIN_CDN_IMAGE)
  }, [homeData])

  return (
    <>
      <div className="z-1">
        <FilterFilm isNotShowSeeAll={true} data={homeData?.data?.items} isLoading={isLoading} />
        <PhimHot titleMovie="Phim Hot" data={homeData?.data?.items} isLoading={isLoading} />
        <MovieCollection />
      </div>
    </>
  )
}

export default Home
