import Box from '@mui/material/Box';
import GradientText from 'src/components/gradientText';
import WinnersList from './winners-list';
import { Stack } from '@mui/material';

export default function Garage() {

    return (
        <>
            <Stack direction={'column'} >
                <Box display={'flex'}>
                    <GradientText variant='h4'>Winners</GradientText>
                </Box>
                <WinnersList />
            </Stack>
        </>
    )
}