import { Stack, Typography } from "@mui/material";
import TrackBorder from "./trackBorder";
import Track from "./track";
import IconButton from '@mui/material/IconButton';
import Iconify from "src/components/iconify";
import { useGarageContext } from "./context";
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import GradientText from "src/components/gradientText";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function RaceTable() {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <GradientText variant="h5">WINNER</GradientText>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}