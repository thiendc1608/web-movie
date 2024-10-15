import React, { useState } from 'react'
import BreadcrumbFunction from '@/components/BreadCrumb/BreadcrumbFunction'
import FilterFilm from '@/components/FilterFilm/FilterFilm'
import TopView from '@/components/Home/TopView/TopView'
import { Link, useParams } from 'react-router-dom'
import { useGetDetailFilm, useGetRelateFilm } from '@/api/detail-film'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default'
import ShowEpisodes from '@/components/DetailFilm/ShowEpisodes'
import { Download } from 'lucide-react'
import MovieCollectionItem from '@/components/Home/MovieCollection/MovieCollectionItem'
import { useShowEpisodes } from '@/stores/useShowEpisodes'
import Skeleton from 'react-loading-skeleton'
import { useGetHomeData } from '@/api/home-api'

const WatchFilm = () => {
  const { filmName } = useParams()
  const { episodes } = useShowEpisodes()
  const { homeData, isLoading } = useGetHomeData()
  const [isExpanded, setIsExpanded] = useState(false)
  const { detailFilm, isLoading: isDetailFilm } = useGetDetailFilm(filmName ?? '')
  const category = detailFilm?.data.item.category[detailFilm?.data.item.category.length - 1].slug
  const { relateFilm } = useGetRelateFilm(detailFilm?.data.item.slug, category)
  const dataStored = localStorage.getItem('urlDomain')
  const urlDomainImage = dataStored ? JSON.parse(dataStored).state.urlDomainImage : ''

  return (
    <div>
      <FilterFilm isNotShowSeeAll={false} data={homeData?.data?.items} isLoading={isLoading} />
      <div className="bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg">
        <div className="lg:mr-5 mb-5 lg:w-3/4">
          <div className="mb-3 mt-3">
            <BreadcrumbFunction data={detailFilm?.data.breadCrumb} isLoading={isDetailFilm} />
            {isLoading ? (
              <Skeleton width={923} height={593} />
            ) : (
              <>
                <div className="bg-[#fef5c4] border-[1px] border-[#fadf98] p-[5px] overflow-hidden text-center text-[10px] md:text-[11px] lg:text-[13px] leading-[1.6] rounded-t-sm mt-2">
                  <span className="text-[#222222]">
                    <strong>
                      – Chú ý: Yêu Cầu Phim Tại Đây:
                      <a href="" className="text-[#87c3f9] ml-2">
                        Bấm vào đây
                      </a>
                    </strong>
                  </span>
                </div>
                <div className="mt-2 relative">
                  {detailFilm?.data.item.episodes[0].server_data[0].link_m3u8 ? (
                    <MediaPlayer
                      title={detailFilm?.data.item.name}
                      src={detailFilm?.data.item.episodes[0].server_data[0].link_m3u8}
                    >
                      <MediaProvider>
                        <Poster
                          className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                          src={`${urlDomainImage}/uploads/movies/${detailFilm?.data.item.thumb_url.replace(
                            'thumb',
                            'poster'
                          )}`}
                          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
                        />
                      </MediaProvider>
                      <DefaultVideoLayout
                        thumbnails={`${urlDomainImage}/uploads/movies/${detailFilm?.data.item.thumb_url}`}
                        icons={defaultLayoutIcons}
                      />
                    </MediaPlayer>
                  ) : (
                    <p className="mb-3 text-center text-[#D75A4A]">
                      Phim đang được cập nhật. Bạn có thể lựa chọn phim khác để theo dõi
                    </p>
                  )}
                </div>
                <div className="bg-[#fef5c4] border-[1px] border-[#fadf98] p-[5px] overflow-hidden text-center text-[10px] md:text-[11px] lg:text-[13px] leading-[1.6] rounded-t-sm">
                  <span className="text-[#222222]">
                    <strong>
                      – Chú ý: Hãy bình luận khen chê báo lỗi bên dưới nhé.
                      <a href="" className="text-[#87c3f9] ml-2 hidden">
                        Bấm vào đây
                      </a>
                    </strong>
                  </span>
                </div>
              </>
            )}
            {isLoading ? (
              <Skeleton width={923} height={132} />
            ) : (
              <>
                <div className="bg-[#19222b] p-[15px] pb-0 shadow-md my-2.5 rounded-[4px] flex items-center justify-between">
                  <div className="flex gap-3">
                    <button className="relative animate-bookmarkshake ">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        version="1.1"
                        viewBox="0 0 16 16"
                        color="#d75a4a"
                        height="40"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: 'rgb(215, 90, 74)' }}
                      >
                        <path d="M3 0v16l5-5 5 5v-16z"></path>
                      </svg>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        color="#0fdd20"
                        className="absolute top-1/2 -right-1 bg-[#3c523e] rounded-full"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: 'rgb(15, 221, 32)' }}
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                      </svg>
                    </button>
                    <div className="pb-[8px]">
                      <h1 className="leading-[25px] text-[18px] text-[#d78f07] tw-multiline-ellipsis-1 font-[500px]">
                        {detailFilm?.data.item.name}
                        <span className="ml-1.5">{`Tập ${episodes}`}</span>
                        <span className="ml-2">{`${detailFilm?.data.item.quality} + ${detailFilm?.data.item.lang}`}</span>
                      </h1>
                      <button
                        className="text-[13px] text-[#a5a5a5] flex items-center"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        <span>Nội dung phim</span>{' '}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          height="15"
                          width="15"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
                          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <ShowEpisodes data={detailFilm?.data.item} />
              </>
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
                    {detailFilm?.data.item.episodes[0].server_data.map((link, idx) => (
                      <tr key={idx} className="border-[#202b35] border-b-[1px]">
                        <td className="p-[8px] flex items-center gap-2 h-full lg:leading-[56.5px] leading-[20px] cursor-pointer group">
                          <Download size={20} className="group-hover:text-[#b83826]" />
                          <Link
                            to={link.link_m3u8 || null}
                            className="text-[#87c3f9] text-[16px] group-hover:text-[#b83826]"
                          >
                            {link.filename
                              ? `${
                                  link.filename.length > 80 ? link.filename.slice(0, 80) + '...' : link.filename
                                } - Tập ${link.name}`
                              : ''}
                          </Link>
                        </td>
                        <td className="p-[8px]">
                          <span className="p-1 bg-[#0e1215] rounded-sm text-white border-[1px] border-[#1e2732]">
                            1080p
                          </span>
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
                data={relateFilm?.data.items}
                isNotShowSeeAll={true}
                countImageShow={12}
                isLoading={isDetailFilm}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="mb-5 mt-5 min-h-screen cursor-pointer">
            <TopView countImageShow={10} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchFilm
