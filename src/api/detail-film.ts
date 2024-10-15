import {  ListDataTypes } from '@/type'
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useQueryString } from '@/utils/utils';

export const detailFilmApi = {
  getDetailFilmApi: (url:string) => axiosClient.get<ListDataTypes>('/phim/' + url),
}

export const useGetDetailFilm = (url:string) => {
  const {
    data: detailFilm,
    isLoading,
    error,
  } = useQuery({queryKey: [`fetchDetailFilm`, url], queryFn: () => detailFilmApi.getDetailFilmApi(url)});

  if (error) {
    toast.error(error.toString());
  }

  return { detailFilm, isLoading };
}

export const relateFilmApi = {
  getRelateFilmApi: (url:string, page: number, category?: string, country?:string, year?:string, sort_field?:string, ) => axiosClient.get<ListDataTypes>('/danh-sach/' + url, {params: {category, country, year, sort_field, page}}),
}

export const useGetRelateFilm = (url:string, category?: string, country?:string, year?:string, sort_field?:string) => {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: relateFilm,
    isLoading,
    error,
  } = useQuery({queryKey: [`fetchRelateFilm`, {url, category, country, year, sort_field, page}], queryFn: () => relateFilmApi.getRelateFilmApi(url, page, category, country, year, sort_field), refetchOnWindowFocus: false});

  if (error) {
    toast.error(error.toString());
  }

  return { relateFilm, isLoading };
}