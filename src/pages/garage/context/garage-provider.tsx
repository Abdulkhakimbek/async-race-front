import { useMemo, useState, useEffect, useCallback } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';

import { GarageValueProps } from 'src/types/garage';
import { GarageContext } from './garage-context';
import { ICarItem } from 'src/types/car';
import axiosInstance from 'src/utils/axios';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'src/components/snackbar';

const STORAGE_KEY = 'garage';

type GarageProviderProps = {
  children: React.ReactNode;
  defaultSettings: GarageValueProps;
};

export function GarageStateProvider({ children, defaultSettings }: GarageProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);
  const { currentPage, _limit, cars, totalCount, needToUpdate } = state;
  const { enqueueSnackbar } = useSnackbar();

  const getCars = useCallback(async () => {
    const response = await axiosInstance.get('/garage', { params: { _page: currentPage, _limit } });
    update('cars', response.data);
    update('totalCount', response.headers['x-total-count']);
    console.log('cars', cars);

  }, [currentPage, _limit, needToUpdate])

  const nextPage = () => {
    update('currentPage', currentPage + 1)
  }

  const prevPage = () => {
    update('currentPage', currentPage - 1)
  }

  const onCreateCar = useCallback(async (car: ICarItem) => {
    const response: AxiosResponse<any, ICarItem> = await axiosInstance.post('/garage', car);
    enqueueSnackbar('Car created successfully', { variant: 'success' });
  }, []);

  const onSelectCar = useCallback((car: ICarItem) => {
    update('selectedCar', car);
  }, []);

  const onUpdateCar = useCallback(async (car: ICarItem) => {
    const response: AxiosResponse<any, ICarItem> = await axiosInstance.put(`/garage/${car?.id}`, car);
    enqueueSnackbar('Car updated successfully', { variant: 'success' });
    reset();
    update('needToUpdate', true);
  }, []);

  const onDeleteCar = useCallback(async (id: string | number) => {
    const response: AxiosResponse<any, string | number> = await axiosInstance.delete(`/garage/${id}`);
    if (response?.status === 200) enqueueSnackbar('Delete success!');
    if (response?.status >= 400) enqueueSnackbar('Not deleted');
  }, []);

  useEffect(() => {
    getCars();
  }, [currentPage, _limit, needToUpdate])

  const memoizedValue = useMemo(
    () => ({
      ...state,
      reset,
      update,
      onSelectCar,
      onUpdateCar,
      onCreateCar,
      onDeleteCar,
      nextPage,
      prevPage,
    }),
    [
      reset,
      update,
      state,
      onSelectCar,
      onUpdateCar,
      onCreateCar,
      onDeleteCar,
    ]
  );

  return <GarageContext.Provider value={memoizedValue}>{children}</GarageContext.Provider>;
}