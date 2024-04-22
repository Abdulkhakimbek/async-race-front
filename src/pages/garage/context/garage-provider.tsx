import {
  useMemo, useEffect, useCallback,
} from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';

import { GarageValueProps } from 'src/types/garage';
import { ICarItem } from 'src/types/car';
import axiosInstance from 'src/utils/axios';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'src/components/snackbar';
import { GarageContext } from './garage-context';
import { createWinner } from 'src/api/winners';

const STORAGE_KEY = 'garage';

type GarageProviderProps = {
  children: React.ReactNode;
  defaultSettings: GarageValueProps;
};

export function GarageStateProvider({ children, defaultSettings }: GarageProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);
  const {
    currentPage, _limit, cars, totalCount, needToUpdate,
  } = state;
  const { enqueueSnackbar } = useSnackbar();

  const getCars = useCallback(async () => {
    const response = await axiosInstance.get('/garage', { params: { _page: currentPage, _limit } });
    update('cars', response.data);
    update('totalCount', response.headers['x-total-count']);
  }, [currentPage, _limit, needToUpdate]);

  const manageEngine = useCallback(
    async (cars: ICarItem[], status: 'started' | 'stopped') => {
      try {
        const enginePromises = cars.map(async (car) => {
          const response = await axiosInstance.patch(
            '/engine',
            {},
            { params: { id: car.id, status } },
          );
          return response;
        });

        const engineResponses = await Promise.all(enginePromises);

        const updatedCars = cars.map((car, index) => {
          const { velocity } = engineResponses[index].data;
          return { ...car, velocity };
        });

        if (state?.cars?.length === updatedCars?.length) {
          update('cars', updatedCars);
        } else {
          const totalList = state?.cars?.map((car: ICarItem) => {
            const found = updatedCars?.find((_) => _?.id === car?.id);

            return found || car;
          });
          update('cars', totalList);
        }

        if (status === 'started') {
          const drivePromises = cars.map(async (car) => {
            const driveRes = await axiosInstance.patch(
              '/engine',
              {},
              { params: { id: car.id, status: 'drive' } },
            );

            return driveRes;
          });

          const driveResponses = await Promise.allSettled(drivePromises);

          const updatedCarsMode = cars.map((car, index) => {
            if (driveResponses[index].status === 'fulfilled') {
              const { success: driveStatus } = (driveResponses[index] as PromiseFulfilledResult<AxiosResponse<any, any>>).value.data;
              return {
                ...car,
                velocity: driveStatus ? updatedCars[index].velocity : 0,
                drive: driveStatus,
              };
            }
            console.error(`Failed to set drive mode for car ${car.id}:`, driveResponses[index]);
            return {
              ...car,
              velocity: 0.001,
              drive: false,
            };
          });

          if (state?.cars?.length === updatedCarsMode?.length) {
            update('cars', updatedCarsMode);

            let winner: null | ICarItem = null;
            updatedCarsMode.forEach((car) => {
              if (!winner) { winner = { ...car } };

              if (car.velocity > (winner?.velocity ?? 0) && car?.drive) {
                winner = { ...car }
              };
            });


            if (winner) {
              let res = createWinner(winner);
              update('winner', winner);
              console.log('createWinner1', res);

            }

          } else {
            const totalList: ICarItem[] = state?.cars?.map((car: ICarItem) => {
              const found = updatedCarsMode?.find((_) => _?.id === car?.id);
              return found || car;
            });
            update('cars', totalList);


            let winner: null | ICarItem = null;
            totalList.forEach((car) => {
              if (!winner) { winner = { ...car } };

              if ((car?.velocity ?? 0) > (winner?.velocity ?? 0) && car?.drive) {
                winner = { ...car }
              };
            });


            if (winner) {
              let res = createWinner(winner);
              update('winner', winner);
              console.log('createWinner2', res);
            }

          }
        }
      } catch (error) {
        console.log('error at response1:', error);
      }
    },
    [cars, update],
  );

  const nextPage = () => {
    update('currentPage', currentPage + 1);
  };

  const prevPage = () => {
    update('currentPage', currentPage - 1);
  };

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
    const response: AxiosResponse<any, ICarItem> = await axiosInstance.put(
      `/garage/${car?.id}`,
      car,
    );
    if (response?.status >= 200 && response?.status < 300) {
      enqueueSnackbar(response?.statusText || 'Car updated successfully', { variant: 'success' });
    } else {
      enqueueSnackbar(response?.statusText || 'Car not updated', { variant: 'error' });
    }
    reset();
    update('needToUpdate', true);
  }, []);

  const onDeleteCar = useCallback(async (id: string | number) => {
    const response: AxiosResponse<any, string | number> = await axiosInstance.delete(
      `/garage/${id}`,
    );

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
  }, [currentPage, _limit, needToUpdate]);

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
      manageEngine,
    }),
    [reset, update, state, onSelectCar, onUpdateCar, onCreateCar, onDeleteCar, manageEngine],
  );

  return <GarageContext.Provider value={memoizedValue}>{children}</GarageContext.Provider>;
}
