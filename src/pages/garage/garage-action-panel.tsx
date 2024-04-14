import { Box, Stack, Button } from "@mui/material";
import Iconify from "src/components/iconify";
import CreateAndUpdateCar from "./createAndUpdateCar";

export default function GarageActionPanel() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={1}>
                    <Button
                        variant="outlined"
                        color="success"
                        endIcon={<Iconify icon="uil:play" />}
                    >Race</Button>

                    <Button
                        variant="outlined"
                        color="warning"
                        endIcon={<Iconify icon="system-uicons:reset" />}
                    >Reset</Button>
                </Stack>

                <CreateAndUpdateCar action={'CREATE'} />
                <CreateAndUpdateCar action={'UPDATE'} />

                <Button
                    variant="outlined"
                    color="success"
                >GENERATE CARS</Button>
            </Stack>
        </>
    )
}