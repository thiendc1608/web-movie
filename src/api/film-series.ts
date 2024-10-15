import { ListDataTypes } from '@/type'
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useQueryString } from '@/utils/utils'

export const filmSeriesApi = {
  getFilmSeries: (page: number) => axiosClient.get<ListDataTypes>('/danh-sach/phim-bo', { params: { page } }),
}

export const useGetFilmSeries = () => {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: filmSeries,
    isLoading,
    error,
  } = useQuery({ queryKey: ['fetchFilmSeries', page], queryFn: () => filmSeriesApi.getFilmSeries(page), refetchOnWindowFocus: false })

  if (error) {
    toast.error(error.toString())
  }

  return { filmSeries, isLoading }
}
