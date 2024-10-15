import { useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './DetailFilm.css'
import ShowInfoFilm from './ShowInfoFilm'
import ShowImageFilm from './ShowImageFilm'
import { useShowEpisodes } from '@/stores/useShowEpisodes'
import ShowEpisodes from './ShowEpisodes'
import { Download, TriangleAlert } from 'lucide-react'
import './DetailFilm.css'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import MovieCollectionItem from '../Home/MovieCollection/MovieCollectionItem'
import { useGetRelateFilm } from '@/api/detail-film'
import { HomeListFilm } from '@/type'
import Skeleton from 'react-loading-skeleton'

interface DetailFilmItemProps {
  data: HomeListFilm
  isLoading: boolean
}

const DetailFilmItem = ({ data, isLoading }: DetailFilmItemProps) => {
  const { isShowEpisodes } = useShowEpisodes() as { isShowEpisodes: boolean }
  const [isExpand, setIsExpand] = useState(false)
  const category = data ? data.category[data.category.length - 1].slug : ''
  const { relateFilm, isLoading: isRelateFilm } = useGetRelateFilm(data?.slug, category)

  return (
    <>
      <div className="grid md:flex gap-4 my-3">
        <div className="md:w-[30%] rounded-lg">
          <ShowImageFilm data={data} isLoading={isLoading} />
        </div>
        <div className="md:w-[70%]">
          <ShowInfoFilm data={data} isLoading={isLoading} />
        </div>
      </div>
      {isShowEpisodes && <ShowEpisodes data={data} />}
      <div className="text-[#eed238] text-[15px] flex items-center gap-3 bg-[#224361] p-[12px]  border-[#435567] mb-[10px]">
        <TriangleAlert style={{ backgroundColor: '#eed238', color: 'black' }} />
        <p>Phim bị lỗi thì bình luận bên dưới để ad fix hoặc qua nhóm tele:...</p>
      </div>
      {isLoading ? (
        <Skeleton height={219.75} width={923} />
      ) : (
        <div className="bg-[#101821] p-3 rounded-md  mb-2.5">
          <div className="text-[#989898] text-[13.5px] py-3 mb-3.5">
            <button className="sectionTitle-custom border-b">
              <span className="font-extrabold tracking-wider capitalize whitespace-nowrap">Nội dung phim</span>
            </button>
            <p className={cn('leading-[1.8] mb-4 mt-4 text-[15px]', isExpand ? '' : 'tw-multiline-ellipsis-3')}>
              {data?.content}
            </p>
            <button className="text-white button-two rounded-md px-2" onClick={() => setIsExpand(!isExpand)}>
              Mở rộng...
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={240} width={923} />
      ) : (
        <div className="bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto  h-60 scroll-bar-custom">
          <table className="text-[13px] mb-[20px] w-full">
            <thead className="border-b-2 border-[#202b35]">
              <tr className="font-bold truncate">
                <th className="p-[8px] w-[80%]">Liên kết tải về</th>
                <th className="p-[8px]">Chất lượng</th>
                <th className="p-[8px]">Ngôn ngữ</th>
              </tr>
            </thead>
            <tbody className="hover:bg-[#04090e]">
              {data?.episodes[0].server_data.map((link, idx) => (
                <tr key={idx} className="border-[#202b35] border-b-[1px]">
                  <td className="p-[8px] flex items-center gap-2 h-full leading-[56.5px] select-none cursor-pointer group">
                    <Download size={20} className="group-hover:text-[#b83826]" />
                    {link.link_m3u8 && (
                      <Link to={link.link_m3u8} className="text-[#87c3f9] text-[16px] group-hover:text-[#b83826]">
                        {link.filename || 'Không có link nào được liên kết'}
                      </Link>
                    )}
                  </td>
                  <td className="p-[8px]">
                    <span className="p-1 bg-[#0e1215] rounded-sm text-white border-[1px] border-[#1e2732]">1080p</span>
                  </td>
                  <td className="p-[8px]">Vietsub sẵn</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="transition duration-300 mt-3">
        <MovieCollectionItem
          titleMovie="Có thể phù hợp với bạn"
          data={relateFilm?.data?.items}
          isNotShowSeeAll={true}
          countImageShow={12}
          isLoading={isRelateFilm}
        />
      </div>
    </>
  )
}

export default DetailFilmItem
