import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { ICarItem } from 'src/types/car';


export function useGetCar(carId: string) {
  const URL = carId ? [endpoints.car.details, { params: { carId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      car: data?.data as ICarItem,
      carLoading: isLoading,
      carError: error,
      carValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------
