
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useQueryString } from '@/utils/utils';
import { HomeListFilm } from '@/type';

export const movieApi = {
  getMovieApi: (page: number) => axiosClient.get<HomeListFilm[]>('/danh-sach/phim-le', { params: { page } } ),
}

export const useGetMovieData = () => {
    const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery({queryKey: [`fetchMovieData`, page], queryFn: () => movieApi.getMovieApi(page)});

  if (error) {
    toast.error(error.toString());
  }

  return { movieData, isLoading };
}