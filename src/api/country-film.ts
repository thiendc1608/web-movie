import { HomeDataInfo } from '@/type'
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useQueryString } from '@/utils/utils'

export const countryFilmApi = {
  getCountryFilm: (url:string, page: number) => axiosClient.get<HomeDataInfo>('/quoc-gia/' + url, { params: { page } }),
}

export const useGetCountryFilm = (url:string) => {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: countryFilmData,
    isLoading,
    error,
  } = useQuery({ queryKey: ['fetchCountryFilmData', {url, page}], queryFn: () => countryFilmApi.getCountryFilm(url, page) })

  if (error) {
    toast.error(error.toString())
  }

  return { countryFilmData, isLoading }
}
