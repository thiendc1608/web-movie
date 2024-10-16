import { axiosClient } from './axios-client'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useQueryString } from '@/utils/utils'
import { ListDataTypes } from '@/type'

export const filmCategoryApi = {
  getFilmCategory: (url:string, page: number) => axiosClient.get<ListDataTypes>('/the-loai/' + url, { params: { page } }),
}

export const useGetFilmCategory = (url:string) => {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: filmCategoryData,
    isLoading,
    error,
  } = useQuery({ queryKey: ['fetchFilmCategory', {url, page}], queryFn: () => filmCategoryApi.getFilmCategory(url, page), refetchOnWindowFocus: false })

  if (error) {
    toast.error(error.toString())
  }

  return { filmCategoryData, isLoading }
}
