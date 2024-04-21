import { Box, Stack, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import CreateAndUpdateCar from './createAndUpdateCar';
import RandomCarGenerator from './randomCarGenerateBtn';
import { useGarageContext } from './context';

export default function GarageActionPanel() {
  const { cars, manageEngine } = useGarageContext();

  const startRace = () => {
    manageEngine(cars, 'started');
  };

  const stopRace = () => {
    manageEngine(cars, 'stopped');
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="success"
          endIcon={<Iconify icon="uil:play" />}
          onClick={startRace}
        >
          Race
        </Button>

        <Button
          variant="outlined"
          color="warning"
          endIcon={<Iconify icon="system-uicons:reset" />}
          onClick={stopRace}
        >
          Reset
        </Button>
      </Stack>

      <CreateAndUpdateCar action="CREATE" />
      <CreateAndUpdateCar action="UPDATE" />

      <RandomCarGenerator />
    </Stack>
  );
}
