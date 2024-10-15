import { ListDataTypes } from '@/type'
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useQueryString } from '@/utils/utils';

export const tvShowsApi = {
  getTvShowsApi: (page: number) => axiosClient.get<ListDataTypes>('/danh-sach/tv-shows', { params: { page } } ),
}

export const useGetTVShowsData = () => {
const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: tvShowsData,
    isLoading,
    error,
  } = useQuery({queryKey: [`fetchTVShowsData`, page], queryFn: () => tvShowsApi.getTvShowsApi(page), refetchOnWindowFocus: false});

  if (error) {
    toast.error(error.toString());
  }

  return { tvShowsData, isLoading };
}