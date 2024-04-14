import { Box, Stack } from "@mui/material";
import ArrowLine from 'src/components/arrrowLine';
import GradientText from "src/components/gradientText";

export default function HeadingText() {

    return (
        <>
            <Stack direction={'row'} spacing={'auto'}>
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'flex-end'}
                >
                    <ArrowLine width='75%' />
                </Box>

                <GradientText />

                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                >
                    <ArrowLine width='75%' />
                </Box>
            </Stack>
        </>
    )
}