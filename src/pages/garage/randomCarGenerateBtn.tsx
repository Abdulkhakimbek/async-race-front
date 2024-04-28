import { Button } from '@mui/material';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import axiosInstance from 'src/utils/axios';
import { ICarItem } from 'src/types/car';
import { useGarageContext } from './context';

const getRandomElement = (array: string[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const generateRandomName = () => {
  const brands = ['Tesla', 'Ford', 'Chevrolet', 'Toyota', 'Honda', 'BWM', 'Nissan', 'Ferrari'];
  const models = ['Model S', 'Mustang', 'Camaro', 'Corolla', 'Accord'];
  return `${getRandomElement(brands)}`;
};

const generateRandomColor = () => {
  const colors = ['#CD2323', '#D35A1D', '#CBAB1A', '#219116', '#901691'];
  return getRandomElement(colors);
};

export default function RandomCarGenerator() {
  const [loading, setLoading] = useState<boolean>(false);
  const { update, needToUpdate } = useGarageContext();

  const handleGenerateRandomCars = async () => {
    setLoading(true);

    try {
      for (let i = 0; i < 100; i++) {
        const randomCar = {
          name: generateRandomName(),
          color: generateRandomColor(),
        };
        const response: AxiosResponse<any, ICarItem> = await axiosInstance.post(
          '/garage',
          randomCar
        );
      }
    } catch (error) {
      console.error('Error generating cars:', error);
    } finally {
      setLoading(false);
      update('needToUpdate', !needToUpdate);
    }
  };

  return (
    <Button
      onClick={handleGenerateRandomCars}
      disabled={loading}
      variant="outlined"
      color="success"
    >
      {loading ? 'GENERATING...' : 'GENERATE CARS'}
    </Button>
  );
}
