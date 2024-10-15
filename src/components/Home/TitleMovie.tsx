import '@/components/Home/TopView/TopView.css'
import { cn } from '@/lib/utils'
import { _formatString } from '@/utils/utils'
import { Link } from 'react-router-dom'

interface TitleMovieProps {
  titleMovie: string
  isNotShowSeeAll: boolean
}

const TitleMovie = ({ titleMovie, isNotShowSeeAll }: TitleMovieProps) => {
  return (
    <div className="!border-b !border-[#1e2732] mb-3">
      <div className="flex items-center justify-between lg:mr-5">
        <div className="sectionTitle-custom border-b py-3">
          <span className="font-extrabold tracking-wider capitalize whitespace-nowrap">{titleMovie}</span>
        </div>
        <button
          className={cn(
            'sectionTitle-button md:tracking-widest bg-gradient-to-r from-[#151d25] to-[#194161] hover:from-black hover:to-black transition duration-300 mb-1',
            isNotShowSeeAll ? 'hidden' : ''
          )}
        >
          <Link to={`${_formatString(titleMovie)}`}>Xem tất cả</Link>
        </button>
      </div>
    </div>
  )
}

export default TitleMovie
