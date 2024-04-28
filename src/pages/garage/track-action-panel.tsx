import { Button, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { AxiosResponse } from 'axios';

import { ICarItem } from 'src/types/car';
import axiosInstance from 'src/utils/axios';
import { useGarageContext } from './context';
import { useResponsive } from 'src/hooks/use-responsive';

type Props = {
  car: ICarItem;
};

export default function TrackAction({ car }: Props) {
  const { onSelectCar, onDeleteCar, manageEngine } = useGarageContext();
  const mdUp = useResponsive('up', 'md');

  return (
    <Stack 
    direction={mdUp ? "row" :'column'}
    spacing={1}
    >
      <Stack direction={"column"} spacing={1}>
        <Button 
        variant="outlined"
         color="info" 
         onClick={() => onSelectCar(car)}
         >
           {mdUp ?'SELECT' : <Iconify icon="mdi:edit" />}
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => car?.id && onDeleteCar(car?.id)}
        >
        {mdUp ? 'REMOVE' : <Iconify icon="mdi:delete" />}
        </Button>
      </Stack>
      <Stack direction={"column"} spacing={1}>
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
