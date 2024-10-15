import { cn } from '@/lib/utils'
import { useShowEpisodes } from '@/stores/useShowEpisodes'
import { HomeListFilm } from '@/type'
import { Logs } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ShowEpisodesProps {
  data: HomeListFilm
}
const ShowEpisodes = ({ data }: ShowEpisodesProps) => {
  const episodesTotal = Array.from({ length: data?.episode_total.match(/\d+/) }, (_, i) => i + 1)
  const { episodes, setEpisodes } = useShowEpisodes()
  const navigate = useNavigate()

  return (
    <div className="h-auto overflow-hidden mb-3 transition duration-500">
      <div className="text-[12px] mb-2">
        <div className="-mb-[5px] rounded-md bg-[#0b0f15] w-40 flex items-center gap-1.5 font-bold uppercase text-[#ea9b06] px-[10px] pt-[8px] py-[5px]">
          <Logs />
          <span>{data?.episodes[0].server_name}</span>
        </div>
        <div className="bg-[#0b0f15] text-white px-[12px] pt-[15px] pb-2 rounded-[3px]">
          <ul className="flex items-center flex-wrap">
            {episodesTotal.length > 0 &&
              episodesTotal.map((item, idx) => (
                <li
                  key={idx}
                  className={cn(
                    'mr-[4px] mb-[10px] bg-[#1f2c3e] px-[10px] py-[7.5px] rounded-[3px] hover:bg-[#ff9900] hover:text-white transition duration-300 cursor-pointer',
                    item === episodes && 'bg-[#ff9900] text-white'
                  )}
                  onClick={() => {
                    setEpisodes(item)
                    navigate(`/xem-phim/${data?.slug}`)
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ShowEpisodes
