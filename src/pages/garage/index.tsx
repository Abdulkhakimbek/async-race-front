import Stack from '@mui/material/Stack';
import GarageActionPanel from './garage-action-panel';
import RaceTable from './raceTable';

export default function Garage() {

    return (
        <>
            <Stack color={'white'} direction={'column'} spacing={2}>
                <GarageActionPanel />
                <RaceTable />
            </Stack>
        </>
    )
}