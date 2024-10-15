import { HomeDataInfo } from '@/type'
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export const homeApi = {
  getHomeApi: () => axiosClient.get<HomeDataInfo>('/home'),
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