import useDebounce from '@/hooks/useDebounce'
import { useEffect, useState, useTransition } from 'react'
import { IoIosSearch } from 'react-icons/io'
import '@/components/SearchFilm/SearchFilm.css'
import { searchFilmApi } from '@/api/search-film'
import { HomeDataInfo } from '@/type'
import InfoSearch from '../SearchFilm/InfoSearch'

const Search = () => {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<HomeDataInfo>()
  const searchQuery = useDebounce(query, 1000)
  const [isShowResult, setIsShowResult] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery)
      startTransition(() => {
        searchFilmApi
          .getSearchFilmApi(query, 1)
          .then((response) => {
            setSearchResults(response)
          })
          .catch((err) => {
            console.log(err) //I know this is nothign but im running out of time tbh
          })
      })
    }
  }, [searchQuery])

  return (
    <div className="flex sm:w-[300px] md:w-[350px] search-container">
      <div className="text-[13px] h-[38px] border-[1px] border-[#ffbb35] truncate rounded-l-md rounded-r-none w-full text-[#06c5ff] ">
        <input
          type="text"
          placeholder="Tìm kiếm phim"
          className="outline-none bg-[#12171b6e] w-full p-[8px] h-full"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setIsShowResult(true)
          }}
        />
      </div>
      <button className="hover:bg-black border-[1.5px] border-[#ff8a00] h-[38px] p-[5.5px] rounded-r-md">
        <IoIosSearch size={26} color="#ff8a00" />
      </button>
      <InfoSearch
        data={searchResults?.data.items}
        query={query}
        isShowResult={isShowResult}
        setIsShowResult={setIsShowResult}
      />
    </div>
  )
}

export default Search
