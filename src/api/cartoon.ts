import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useQueryString } from '@/utils/utils';
import { ListDataTypes } from '@/type';

export const carToonApi = {
  getCartoonApi: (page: number) => axiosClient.get<ListDataTypes>('/danh-sach/hoat-hinh', { params: { page } } ),
}

export const useGetCarToonData = () => {
const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const {
    data: carToonData,
    isLoading,
    error,
  } = useQuery({queryKey: [`fetchCarToonData`, page], queryFn: () => carToonApi.getCartoonApi(page), refetchOnWindowFocus: false});

  if (error) {
    toast.error(error.toString());
  }

  return { carToonData, isLoading };
}