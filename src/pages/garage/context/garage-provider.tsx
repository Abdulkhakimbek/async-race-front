import { useMemo, useEffect, useCallback } from 'react';

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
  defaultValues: GarageValueProps;
};

export function GarageStateProvider({ children, defaultValues }: GarageProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultValues);
  const { currentPage, _limit, cars, needToUpdate, totalCount } = state;
  const { enqueueSnackbar } = useSnackbar();

  const getCars = useCallback(async () => {
    const response = await axiosInstance.get('/garage', { params: { _page: currentPage, _limit } });
    update('cars', response.data);
    update('totalCount', response.headers['x-total-count']);
  }, [currentPage, _limit, needToUpdate]);

  const manageEngine = useCallback(
    async (cars: ICarItem[], status: 'started' | 'stopped') => {
      try {
        const engineResponses = await Promise.all(
          cars.map((car) => axiosInstance.patch('/engine', {}, { params: { id: car.id, status } }))
        );

        const updatedCars = cars.map((car, index) => ({
          ...car,
          velocity: engineResponses[index].data.velocity,
        }));

        const updateCarsState = (updatedCarsList: ICarItem[]) => {
          const totalList = state?.cars?.map(
            (car: ICarItem) => updatedCarsList.find((uCar) => uCar.id === car.id) || car
          );
          update('cars', totalList);
          return totalList;
        };

        const carsToUpdate =
          state?.cars?.length === updatedCars.length
            ? updateCarsState(updatedCars)
            : updateCarsState(updatedCars);

        if (status === 'started') {
          const driveResponses = await Promise.allSettled(
            cars.map((car) =>
              axiosInstance.patch('/engine', {}, { params: { id: car.id, status: 'drive' } })
            )
          );

          const updatedCarsMode = carsToUpdate.map((car: ICarItem, index: number) => {
            const driveStatus =
              driveResponses[index].status === 'fulfilled'
                ? (driveResponses[index] as PromiseFulfilledResult<AxiosResponse<any, any>>).value
                    .data.success
                : false;
            return {
              ...car,
              velocity: driveStatus ? car.velocity : 0.001,
              drive: driveStatus,
            };
          });

          updateCarsState(updatedCarsMode);

          const winner = updatedCarsMode.reduce(
            (acc: null | ICarItem, car: ICarItem) =>
              car.drive && (car.velocity ?? 0) > (acc?.velocity ?? 0) ? car : acc,
            null
          );
          if (winner) {
            const res = createWinner(winner);
            res.then((res) => {
              update('winner', { ...(res?.data ?? {}), ...winner });
            });
          }
        }
      } catch (error) {
        console.error('Error at manageEngine:', error);
      }
    },
    [cars, update, state?.cars]
  );

  const nextPage = () => {
    update('currentPage', currentPage + 1);
  };

  const prevPage = () => {
    update('currentPage', currentPage - 1);
  };

  const onCreateCar = useCallback(
    async (car: ICarItem) => {
      const response: AxiosResponse<any, ICarItem> = await axiosInstance.post('/garage', car);
      if (response?.status >= 200 && response?.status < 300) {
        enqueueSnackbar(response?.statusText || 'Car created successfully', { variant: 'success' });
      } else {
        enqueueSnackbar(response?.statusText || 'Car not created', { variant: 'error' });
      }

      update('currentPage', Math.ceil((Number(totalCount) + 1) / _limit ?? 1));
      update('needToUpdate', !needToUpdate);
    },
    [totalCount, _limit, currentPage, needToUpdate]
  );

  const onSelectCar = useCallback((car: ICarItem) => {
    update('selectedCar', car);
  }, []);

  const onUpdateCar = useCallback(
    async (car: ICarItem) => {
      const response: AxiosResponse<any, ICarItem> = await axiosInstance.put(
        `/garage/${car?.id}`,
        car
      );
      if (response?.status >= 200 && response?.status < 300) {
        enqueueSnackbar(response?.statusText || 'Car updated successfully', { variant: 'success' });
      } else {
        enqueueSnackbar(response?.statusText || 'Car not updated', { variant: 'error' });
      }
      update('needToUpdate', !needToUpdate);
    },
    [needToUpdate]
  );

  const onDeleteCar = useCallback(
    async (id: string | number) => {
      const response: AxiosResponse<any, string | number> = await axiosInstance.delete(
        `/garage/${id}`
      );

      if (response?.status >= 200 && response?.status < 300) {
        enqueueSnackbar(response?.statusText || 'Car deleted successfully', { variant: 'success' });
      } else {
        enqueueSnackbar(response?.statusText || 'Car not deleted', { variant: 'error' });
      }
      update('needToUpdate', !needToUpdate);
    },
    [needToUpdate]
  );

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
    [reset, update, state, onSelectCar, onUpdateCar, onCreateCar, onDeleteCar, manageEngine]
  );

  return <GarageContext.Provider value={memoizedValue}>{children}</GarageContext.Provider>;
}
