import { Stack, Typography } from "@mui/material";
import TrackBorder from "./trackBorder";
import Track from "./track";
import IconButton from '@mui/material/IconButton';
import Iconify from "src/components/iconify";
import { useGarageContext } from "./context";

export default function RaceTable() {
    const {
        nextPage,
        prevPage,
        currentPage,
        _limit,
        cars,
        totalCount,
    } = useGarageContext();

    return (
        <>
            <Stack direction={'column'}>
                <TrackBorder>
                    {cars?.length > 0 &&
                        cars.map((car) => <Track car={car} />)
                    }
                </TrackBorder>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Typography>{`GARAGE (${totalCount})`}</Typography>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <IconButton
                            disabled={currentPage < 2}
                        >
                            <Iconify
                                icon="fluent:previous-32-regular"
                                width={24}
                                color={currentPage < 2 ? 'grey' : 'white'}
                                onClick={prevPage}
                            />
                        </IconButton>
                        <Typography>{`PAGE #${currentPage}`}</Typography>
                        <IconButton
                            disabled={totalCount < (currentPage * _limit)}
                        >
                            <Iconify
                                icon="fluent:next-32-regular"
                                width={24}
                                color={totalCount < (currentPage * _limit) ? 'grey' : 'white'}
                                onClick={nextPage}
                            />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}