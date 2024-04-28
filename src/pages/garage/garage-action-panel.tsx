import { Stack, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import CreateAndUpdateCar from './createAndUpdateCar';
import RandomCarGenerator from './randomCarGenerateBtn';
import { useGarageContext } from './context';
import { useResponsive } from 'src/hooks/use-responsive';

export default function GarageActionPanel() {
  const { cars, manageEngine } = useGarageContext();

  const startRace = () => {
    manageEngine(cars, 'started');
  };

  const stopRace = () => {
    manageEngine(cars, 'stopped');
  };

  const mdUp = useResponsive('up', 'md');

  return (
    <Stack
      direction={mdUp ? 'row' : 'column'}
      justifyContent={mdUp ? 'space-between' : 'flex-start'}
      spacing={mdUp ? 'auto' : 2}
    >
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
        {!mdUp && <RandomCarGenerator />}
      </Stack>

      <CreateAndUpdateCar action="CREATE" />
      <CreateAndUpdateCar action="UPDATE" />

      {mdUp && <RandomCarGenerator />}
    </Stack>
  );
}
