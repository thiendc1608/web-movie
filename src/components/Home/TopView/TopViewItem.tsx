import React from 'react'
import { HomeListFilm } from '@/type'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'

interface TopViewItemProps {
  countImageShow: number
  data: HomeListFilm[]
}
const TopViewItem = ({ countImageShow, data }: TopViewItemProps) => {
  let dataStored = JSON.parse(localStorage.getItem('urlDomain'))
  const urlDomainImage = dataStored.state.urlDomainImage

  return (
    <>
      {data?.slice(0, countImageShow).map((item: HomeListFilm) => (
        <Link to={`/chi-tiet-phim/${item.slug}`} key={item._id}>
          <div
            className="rightbar-custom group flex items-center gap-4 p-3 rounded-md transition duration-300 ease-in-out 
      animate-gradientMoveltr
      sm:flex-row sm:px-4 border-l border-[#473434] h-auto"
          >
            <div className="w-1/4 sm:w-[15%] md:w-[12%] lg:w-1/4 overflow-hidden rounded-md h-full">
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
                className="w-full h-full object-contain rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 mt-2 sm:mt-0 lg:line-clamp-3">
              <h2 className="text-[#1879bf] font-semibold text-base lg:text-lg line-clamp-2 sm:line-clamp-none group-hover:text-[#da9d29]">
                {item.name}
              </h2>
              <p className="text-gray-400 text-sm lg:text-base line-clamp-3 sm:line-clamp-none">
                {item.origin_name}
                <span className="ml-1">{item.year}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default TopViewItem
