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
  }, [currentPage, _limit, needToUpdate])

  const manageEngine = useCallback(async (id: string | number, status: 'started' | 'stopped') => {
    try {
      const response = await axiosInstance.patch(`/engine`, {}, { params: { id: id, status } });
      console.log('response manageEngine 1', response);
      if (response?.status >= 200 && response?.status < 300) {
        const { velocity } = response.data;

        const updatedCars = cars.map((car: ICarItem) => {
          if (car.id == id) {
            return { ...car, velocity };
          }
          return car;
        });
        update('cars', updatedCars);

        if (status === 'started') {
          try {
            const driveRes = await axiosInstance.patch(`/engine`, {}, { params: { id: id, status: 'drive' } });
            console.log('response manageEngine started', driveRes);

            const updatedCarsMode = cars.map((car: ICarItem) => {
              if (car.id == id) {
                return {
                  ...car,
                  velocity,
                  drive: (response?.status >= 200 && response?.status < 300) ? true : false
                };
              }
              return car;
            });

            update('cars', updatedCarsMode);
          } catch (error) {
            console.log('error at driveRes', error);
          }

        }
      }

    } catch (error) {
      console.log('error at response1:', error)

    }
  }, [cars, update])

  const nextPage = () => {
    update('currentPage', currentPage + 1)
  }

  const prevPage = () => {
    update('currentPage', currentPage - 1)
  }

  const onCreateCar = useCallback(async (car: ICarItem) => {
    const response: AxiosResponse<any, ICarItem> = await axiosInstance.post('/garage', car);
    if (response?.status >= 200 && response?.status < 300) {
      enqueueSnackbar(response?.statusText || 'Car created successfully', { variant: 'success' });
    } else {
      enqueueSnackbar(response?.statusText || 'Car not created', { variant: 'error' });
    }
    reset();
    update('needToUpdate', true);
  }, []);

  const onSelectCar = useCallback((car: ICarItem) => {
    update('selectedCar', car);
  }, []);

  const onUpdateCar = useCallback(async (car: ICarItem) => {
    const response: AxiosResponse<any, ICarItem> = await axiosInstance.put(`/garage/${car?.id}`, car);
    if (response?.status >= 200 && response?.status < 300) {
      enqueueSnackbar(response?.statusText || 'Car updated successfully', { variant: 'success' });
    } else {
      enqueueSnackbar(response?.statusText || 'Car not updated', { variant: 'error' });
    }
    reset();
    update('needToUpdate', true);
  }, []);

  const onDeleteCar = useCallback(async (id: string | number) => {
    const response: AxiosResponse<any, string | number> = await axiosInstance.delete(`/garage/${id}`);

    if (response?.status >= 200 && response?.status < 300) {
      enqueueSnackbar(response?.statusText || 'Car deleted successfully', { variant: 'success' });
    } else {
      enqueueSnackbar(response?.statusText || 'Car not deleted', { variant: 'error' });
    }
    reset();
    update('needToUpdate', true);
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
      manageEngine
    }),
    [
      reset,
      update,
      state,
      onSelectCar,
      onUpdateCar,
      onCreateCar,
      onDeleteCar,
      manageEngine
    ]
  );

  return <GarageContext.Provider value={memoizedValue}>{children}</GarageContext.Provider>;
}