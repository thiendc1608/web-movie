import React from 'react'
import { CalendarDays, Clock, Vote } from 'lucide-react'
import { HomeListFilm } from '@/type'
import Skeleton from 'react-loading-skeleton'

interface ShowInfoFilmProps {
  data: HomeListFilm
  isLoading: boolean
}
const ShowInfoFilm = ({ data, isLoading }: ShowInfoFilmProps) => {
  if (isLoading) {
    return <Skeleton width={634.91} height={372.86} />
  }

  return (
    <div className="text-[#a5a5a5] text-[15px] leading-[20px] flex flex-col gap-3">
      <h1 className="text-[20px] text-[#cacaca] font-bold">{data?.name}</h1>
      <p className="text-[13px]">{data?.origin_name}</p>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <CalendarDays size={20} color="#FDE047" />
          <span className="text-[#82b0da]">{data?.year}</span>
        </span>
        <span className="flex items-center gap-1">
          <Clock size={20} color="#FDE047" />
          <span>{data?.time}</span>
        </span>
        <span className="flex items-center gap-1">
          <Vote size={20} color="#FDE047" />
          <span>{data?.tmdb.vote_average}</span>
        </span>
      </div>
      <p>
        Đang phát:
        <span className="cardInfo-trailer text-white py-1 px-1 rounded-sm font-medium"> {data?.episode_current}</span>
      </p>
      <p>
        Tổng số tập:
        <span className="text-yellow-500"> {data?.episode_total}</span>
      </p>
      <p>
        Quốc gia:
        <span className="text-[#82b0da]"> {data?.country[0].name}</span>
      </p>
      <p className="text-[#cacaca] font-bold">
        Chất lượng:
        <span className="cardInfo-trailer text-white py-1 px-1 rounded-sm font-medium">
          {' '}
          {`${data?.lang}+${data?.quality}`}
        </span>
      </p>
      <p>
        Đạo diễn:
        <span className="text-[#82b0da]"> {data?.director.join(', ') || 'Xin phép giấu tên'}</span>
      </p>
      <p>
        Diễn viên:
        <span className="text-[#82b0da]"> {data?.actor.join(', ') || 'Xin phép giấu tên'}</span>
      </p>
      <p>
        Thể loại:
        <span className="text-[#82b0da]"> {data?.category.map((el) => el.name).join(', ')}</span>
      </p>
      <p>
        Lượt xem:
        <span className="text-[#82b0da]"> {data?.view}</span>
      </p>
    </div>
  )
}

export default ShowInfoFilm
