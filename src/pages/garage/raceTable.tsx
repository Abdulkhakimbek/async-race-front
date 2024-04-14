import { Stack, Typography } from "@mui/material";
import TrackBorder from "./trackBorder";
import Track from "./track";
import IconButton from '@mui/material/IconButton';
import Iconify from "src/components/iconify";

export default function RaceTable() {
    return (
        <>
            <Stack direction={'column'}>
                <TrackBorder>
                    <Track />
                    <Track />
                    <Track />
                </TrackBorder>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Typography>{`GARAGE (${105})`}</Typography>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <IconButton>
                            <Iconify
                                icon="fluent:previous-32-regular"
                                width={24}
                                color={'white'}
                            />
                        </IconButton>
                        <Typography>{`PAGE #${15}`}</Typography>
                        <IconButton>
                            <Iconify
                                icon="fluent:next-32-regular"
                                width={24}
                                color={'white'}
                            />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}