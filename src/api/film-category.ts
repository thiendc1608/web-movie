import { axiosClient } from './axios-client'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useQueryString } from '@/utils/utils'
import { HomeListFilm } from '@/type'

export const filmCategoryApi = {
  getFilmCategory: (url:string, page: number) => axiosClient.get<HomeListFilm[]>('/the-loai/' + url, { params: { page } }),
}

export const useGetFilmCategory = (url:string) => {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: filmCategoryData,
    isLoading,
    error,
  } = useQuery({ queryKey: ['fetchFilmCategory', {url, page}], queryFn: () => filmCategoryApi.getFilmCategory(url, page) })

  if (error) {
    toast.error(error.toString())
  }

  return { filmCategoryData, isLoading }
}
