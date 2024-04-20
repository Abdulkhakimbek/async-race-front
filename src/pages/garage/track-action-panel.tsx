import { Button, Stack } from "@mui/material";
import { AxiosResponse } from "axios";

import { ICarItem } from "src/types/car";
import axiosInstance from "src/utils/axios";
import { useGarageContext } from "./context";

type Props = {
    car: ICarItem
}

export default function TrackAction({ car }: Props) {
    const { onSelectCar, onDeleteCar } = useGarageContext()

    const handleStart = async (status: string) => {
        const response: AxiosResponse<any, ICarItem> = await axiosInstance.patch(`/engine`, { params: { id: car?.id, status: status } });
    }

    return (
        <>
            <Stack direction={'row'} spacing={1}>
                <Stack direction={'column'} spacing={1}>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => onSelectCar(car)}
                    >
                        SELECT
                    </Button>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => car?.id && onDeleteCar(car?.id)}
                    >REMOVE</Button>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => handleStart('started')}
                    >A</Button>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleStart('stopped')}
                    >B</Button>
                </Stack>
            </Stack>
        </>
    )
}