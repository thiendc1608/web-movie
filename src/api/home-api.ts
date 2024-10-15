import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { ListDataTypes } from '@/type';

export const homeApi = {
  getHomeApi: () => axiosClient.get<ListDataTypes>('/home'),
}

export const useGetHomeData = () => {
  const {
    data: homeData,
    isLoading,
    error,
  } = useQuery({queryKey: ["fetchHomeData"], queryFn: () => homeApi.getHomeApi(), refetchOnWindowFocus: false});

  if (error) {
    toast.error(error.toString());
  }

  return { homeData, isLoading };
}