import FilterFilm from '@/components/FilterFilm/FilterFilm'
import { useEffect } from 'react'
import { useGetHomeData } from '@/api/home-api'
import MovieCollection from '@/components/Home/MovieCollection/MovieCollection'
import { useHomeStore } from '@/stores/useHomeStore'
import PhimHot from '@/components/Home/PhimHot/PhimHot'

interface HomeStore {
  setURL: (url: string) => void
}
const Home = () => {
  const { homeData, isLoading } = useGetHomeData()
  const homeStore = useHomeStore() as HomeStore
  const { setURL } = homeStore
  useEffect(() => {
    if (homeData && homeData.data) setURL(homeData.data.APP_DOMAIN_CDN_IMAGE)
  }, [homeData])

  return (
    <>
      <div className="z-1">
        <FilterFilm isNotShowSeeAll={true} data={homeData?.data?.items} isLoading={isLoading} />
        {homeData?.data && <PhimHot titleMovie="Phim Hot" data={homeData.data} isLoading={isLoading} />}
        <MovieCollection />
      </div>
    </>
  )
}

export default Home
