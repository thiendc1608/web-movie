import { HomeDataInfo } from '@/type'
import { axiosClient } from './axios-client'

export const searchFilmApi = {
  getSearchFilmApi: (keyword: string, page?: number) =>
    axiosClient.get<HomeDataInfo>('/tim-kiem', { params: { keyword, page } }),
}
