import { Button, Stack } from '@mui/material';
import { AxiosResponse } from 'axios';

import { ICarItem } from 'src/types/car';
import axiosInstance from 'src/utils/axios';
import { useGarageContext } from './context';

type Props = {
  car: ICarItem;
};

export default function TrackAction({ car }: Props) {
  const { onSelectCar, onDeleteCar, manageEngine } = useGarageContext();
  console.log('Track com', car);
  return (
    <Stack direction="row" spacing={1}>
      <Stack direction="column" spacing={1}>
        <Button variant="outlined" color="info" onClick={() => onSelectCar(car)}>
          SELECT
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => car?.id && onDeleteCar(car?.id)}
        >
          REMOVE
        </Button>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Button
          variant="outlined"
          color="info"
          disabled={!!car?.velocity}
          onClick={() => car.id && manageEngine([car], 'started')}
        >
          A
        </Button>
        <Button
          variant="outlined"
          color="warning"
          disabled={!car?.drive && !car?.velocity}
          onClick={() => car.id && manageEngine([car], 'stopped')}
        >
          B
        </Button>
      </Stack>
    </Stack>
  );
}
