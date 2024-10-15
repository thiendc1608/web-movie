import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { HomeListFilm } from '@/type';

export const homeApi = {
  getHomeApi: () => axiosClient.get<HomeListFilm[]>('/home'),
}

export const useGetHomeData = () => {
  const {
    data: homeData,
    isLoading,
    error,
  } = useQuery({queryKey: ["fetchHomeData"], queryFn: () => homeApi.getHomeApi()});

  if (error) {
    toast.error(error.toString());
  }

  return { homeData, isLoading };
}