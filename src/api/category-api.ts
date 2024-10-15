import { Categories } from '@/type'
import { axiosClient } from './axios-client'
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export const categoryApi = {
  getCategory: () => axiosClient.get<Categories>('/the-loai'),
}

export const useGetCategory = () => {
  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery({queryKey: ["fetchCategoryData"], queryFn: () => categoryApi.getCategory()});

  if (error) {
    toast.error(error.toString());
  }

  return { categoryData, isLoading };
}