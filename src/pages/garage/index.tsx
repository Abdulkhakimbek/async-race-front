import Stack from '@mui/material/Stack';

import RaceTable from './raceTable';
import GarageActionPanel from './garage-action-panel';
import { GarageStateProvider } from './context/garage-provider';

export default function Garage() {
  const defaultValues = {
    currentPage: 1,
    selectedCar: null,
    _limit: 7, // later can be made dynamic
    cars: [], // cars are an array of objects
    totalCount: 0,
    needToUpdate: false,
    winner: null,
    newCar: {
      name: '',
      color: '#ffffff',
    },
  };

  return (
    <GarageStateProvider defaultValues={defaultValues}>
      <Stack color="white" direction="column" spacing={2}>
        <GarageActionPanel />
        <RaceTable />
      </Stack>
    </GarageStateProvider>
  );
}
