import Box from '@mui/material/Box';
import GradientText from 'src/components/gradientText';
import { Stack } from '@mui/material';
import WinnersList from './winners-list';

export default function Garage() {
  return (
    <Stack direction="column">
      <Box display="flex">
        <GradientText variant="h4">Winners</GradientText>
      </Box>
      <WinnersList />
    </Stack>
  );
}
