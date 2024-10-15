import { ListDataTypes } from '@/type'
import { axiosClient } from './axios-client'

export const searchFilmApi = {
  getSearchFilmApi: (keyword: string, page?: number) =>
    axiosClient.get<ListDataTypes>('/tim-kiem', { params: { keyword, page } }),
}
