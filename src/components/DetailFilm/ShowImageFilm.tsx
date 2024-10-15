import { useState } from 'react'
import { HomeListFilm } from '@/type'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { CirclePlay, ChevronDown, Play, X, Heart } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useShowEpisodes } from '@/stores/useShowEpisodes'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

interface ShowImageFilmProps {
  data: HomeListFilm
  isLoading: boolean
}
const ShowImageFilm = ({ data, isLoading }: ShowImageFilmProps) => {
  const dataStored = localStorage.getItem('urlDomain')
  const urlDomainImage = dataStored ? JSON.parse(dataStored).state.urlDomainImage : ''
  const [isClickTrailer, setIsClickTrailer] = useState(false)
  const { isShowEpisodes, setIsShowEpisodes } = useShowEpisodes() as {
    isShowEpisodes: boolean
    setIsShowEpisodes: (value: boolean) => void
  }
  const navigate = useNavigate()

  if (isLoading) {
    return <Skeleton width={272.09} height={372.86} />
  }
  console.log(data)

  return (
    <div className="bg-blue-800 relative justify-between min-[425px]:ml-[4px] min-[425px]:mr-[43px] md:mx-0  rounded-lg h-full w-full">
      <div className="flex flex-col items-center rounded-lg">
        <LazyLoadImage
          effect="blur"
          wrapperProps={{
            // If you need to, you can tweak the effect transition using the wrapper style.
            style: {
              transitionDelay: '0.2s',
            },
          }}
          src={`${urlDomainImage}/uploads/movies/${data?.thumb_url}`}
          alt={`${data?.name}`}
          className="rounded-lg h-full w-full"
        />
        <div className="mt-4 absolute text-black -top-2 left-2 animate-bookmarkshake">
          <button>
            <Heart color="red" size={30} />
          </button>
        </div>
        <button
          className="text-sm text-white flex items-center gap-1 mt-2 absolute top-[2px] right-[7px] cardInfo-trailer rounded-[20px] px-3 py-1"
          onClick={() => setIsClickTrailer(true)}
        >
          <CirclePlay size={20} />
          <span>Trailer</span>
        </button>
        <div className="flex justify-center text-sm mt-4 mb-3 absolute bottom-0 w-full text-white truncate min-[768px]:text-[11px] min-[1180px]:text-sm">
          <button
            className="flex items-center gap-1 rounded-lg px-2 py-2 mx-2 button-one transition duration-300"
            onClick={() => setIsShowEpisodes(!isShowEpisodes)}
          >
            <ChevronDown size={16} />
            <span>Tập phim</span>
          </button>
          {isClickTrailer && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 tw-flex-center z-50"
              onClick={() => setIsClickTrailer(false)}
            >
              <div className="rounded-md bg-white shadow-lg absolute top-10 right-10 cursor-pointer">
                <X size={50} color="red" />
              </div>
              {data?.trailer_url ? (
                <ReactPlayer url={data?.trailer_url} width={640} height={360} controls={true} />
              ) : (
                <div
                  className="text-yellow-500 max-w-[500px] h-[200px] bg-slate-600 rounded-md text-xl flex flex-col items-center justify-center p-4 select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Trailer của phim hiện đang chờ cập nhật. </span>
                  <span>Xin quý khách ghé lại sau</span>
                </div>
              )}
            </div>
          )}
          <button
            className="flex items-center gap-1 rounded-lg px-2 mx-2 button-two transition duration-300"
            onClick={() => navigate(`/xem-phim/${data?.slug}`)}
          >
            <Play size={16} />
            <span>Xem phim</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowImageFilm
