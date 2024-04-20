import Box from '@mui/material/Box';
import Header from './head';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {


    return (
        <Box sx={{

            padding: '2% 5% 4% 5%',
        }}>
            <Stack
                component="main"
                direction={'column'}
                gap={'40px'}
                sx={{
                    flexGrow: 1,
                    // border: '1px solid white',
                }}
            >
                <Header />
                {children}
            </Stack>

        </Box>
    );
}
