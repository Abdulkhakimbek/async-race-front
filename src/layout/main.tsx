import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

import Header from './head';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <Box
      sx={{
        padding: '4% 5%',
        height: { md: '100vh', xs: 'auto' },
        width: '100vw',
      }}
    >
      <Stack
        component="main"
        direction="column"
        gap="40px"
        sx={{
          flexGrow: 1,
        }}
      >
        <Header />
        {children}
      </Stack>
    </Box>
  );
}
