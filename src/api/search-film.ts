import { HomeListFilm } from '@/type'
import { axiosClient } from './axios-client'

export const searchFilmApi = {
  getSearchFilmApi: (keyword: string, page?: number) =>
    axiosClient.get<HomeListFilm[]>('/tim-kiem', { params: { keyword, page } }),
}
