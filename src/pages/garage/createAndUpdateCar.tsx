import { Stack, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import ColorPicker from "src/components/colorPicker";

type Props = {
    children?: React.ReactNode;
    action: string;
};

export default function CreateAndUpdateCar({ action }: Props) {

    return (
        <>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <TextField
                    variant="outlined"
                    placeholder="TYPE CAR BRAND"
                    size="small"
                    sx={{
                        background: 'white',
                        borderRadius: '4px',
                    }}
                />
                <ColorPicker />
                <Button
                    variant="outlined"
                    color="warning"
                >
                    {action}
                </Button>
            </Stack>
        </>
    )
}