import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { Button } from "@mui/material";
import HeadingText from './headingText';



type Props = {
    children: React.ReactNode;
};



export default function Header() {

    return (
        <>
            <Stack direction={'row'} alignItems={'center'} spacing={3} height={'30%'}>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    spacing={4}
                    maxWidth={'140px'}
                >
                    <Button
                        size={'large'}
                        href={'/garage'}
                        variant="outlined"
                    >
                        Garage
                    </Button>
                    <Button
                        size={'large'}
                        href={'/winners'}
                        variant="outlined"
                        color='warning'
                    >
                        Winners
                    </Button>
                </Stack>
                <HeadingText />
            </Stack>
        </>
    );
}