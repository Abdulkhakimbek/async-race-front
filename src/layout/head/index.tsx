import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import HeadingText from './headingText';

export default function Header() {

  return (
    <Stack 
     direction="row"
     alignItems="center" 
     spacing={3} 
     sx={{
      height: { xs: '40%', md: '30%'},
      flexDirection: { xs: 'column', md: 'row'},
      alignItems: { xs: 'space-between', md: 'center'},
     }}
     >
      <Box 
      sx={{ 
        display: 'flex',
        justifyContent:{ xs: 'space-between', md: 'flex-start'},
        alignItems: { xs: 'center', md: 'flex-start'},
        flexDirection: { xs: 'row', md: 'column'},
        mb: { xs: 5, md: 0 },
        gap: {  md: '20px'},
      }}
      >
        <Button component={RouterLink} size="large" href="/garage" variant="outlined">
          Garage
        </Button>
        <Button
          component={RouterLink}
          size="large"
          href="/winners"
          variant="outlined"
          color="warning"
        >
          Winners
        </Button>
      </Box>
      <HeadingText />
    </Stack>
  );
}
