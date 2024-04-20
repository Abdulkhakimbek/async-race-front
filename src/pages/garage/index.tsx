import Stack from '@mui/material/Stack';
import GarageActionPanel from './garage-action-panel';
import RaceTable from './raceTable';
import { GarageStateProvider } from './context/garage-provider';

export default function Garage() {

    const defaultSettings = {
        currentPage: 1,
        selectedCar: null,
        _limit: 7,//leter can be made dynamic
        cars: [], // Assuming cars is an array
        carsLoading: false,
        carsEmpty: true,
        totalCount: 0,
        needToUpdate: false,
    };

    return (
        <>
            <GarageStateProvider defaultSettings={defaultSettings}>
                <Stack color={'white'} direction={'column'} spacing={2}>
                    <GarageActionPanel />
                    <RaceTable />
                </Stack>
            </GarageStateProvider>
        </>
    )
}