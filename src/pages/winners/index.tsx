import Box from '@mui/material/Box';
import GradientText from 'src/components/gradientText';
import { Stack } from '@mui/material';
import WinnersList from './winners-list';
import { WinnersStateProvider } from './context/winners-provider';

export default function Winners() {
  const defaultValues = {
    wCurrentPage: 1,
    _limit: 7, // later can be made dynamic
    winners: [], // cars are an array of objects
    wTotalCount: 0,
    wNeedToUpdate: false,
  };

  return (
    <WinnersStateProvider defaultValues={defaultValues}>
      <Stack direction="column">
        <Box display="flex">
          <GradientText variant="h4">Winners</GradientText>
        </Box>
        <WinnersList />
      </Stack>
    </WinnersStateProvider>
  );
}
