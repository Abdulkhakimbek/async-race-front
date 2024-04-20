import { Box, Stack, Button } from "@mui/material";
import Iconify from "src/components/iconify";
import CreateAndUpdateCar from "./createAndUpdateCar";
import RandomCarGenerator from "./randomCarGenerateBtn";
import { useGarageContext } from "./context";

export default function GarageActionPanel() {
    const { reset } = useGarageContext();
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
                        onClick={reset}
                    >Reset</Button>
                </Stack>

                <CreateAndUpdateCar action={'CREATE'} />
                <CreateAndUpdateCar action={'UPDATE'} />

                <RandomCarGenerator />
            </Stack>
        </>
    )
}