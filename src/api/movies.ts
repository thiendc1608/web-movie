
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useQueryString } from '@/utils/utils';
import { ListDataTypes } from '@/type';

export const movieApi = {
  getMovieApi: (page: number) => axiosClient.get<ListDataTypes>('/danh-sach/phim-le', { params: { page } } ),
}

export const useGetMovieData = () => {
    const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery({queryKey: [`fetchMovieData`, page], queryFn: () => movieApi.getMovieApi(page), refetchOnWindowFocus: false});

  if (error) {
    toast.error(error.toString());
  }

  return { movieData, isLoading };
}