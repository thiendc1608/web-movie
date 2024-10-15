import { ListDataTypes } from '@/type'
import { axiosClient } from './axios-client'
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const topViewApi = {
  getTopViewApi: (sort_field: string, page: number) => axiosClient.get<ListDataTypes>('/danh-sach/phim-moi', { params: { sort_field, page } }),
}

export const useGetTopViewData = (sort_field: string) => {
  const {
    data: topViewData,
    isLoading,
    error,
  } = useQuery({queryKey: [`fetchTopViewData-${sort_field}`], queryFn: () => topViewApi.getTopViewApi(sort_field, 1),refetchOnWindowFocus: false});

  if (error) {
    toast.error(error.toString());
  }

  return { topViewData, isLoading };
}