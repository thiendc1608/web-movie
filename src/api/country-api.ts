import { Categories } from '@/type'
import { axiosClient } from './axios-client'
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const countryApi = {
  getCountry: () => axiosClient.get<Categories>('/quoc-gia'),
}

export const useGetCountry = () => {
  const {
    data: countryData,
    isLoading,
    error,
  } = useQuery({queryKey: ["fetchCountryData"], queryFn: () => countryApi.getCountry()});

  if (error) {
    toast.error(error.toString());
  }

  return { countryData, isLoading };
}