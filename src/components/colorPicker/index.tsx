import { useState } from "react";
import { Box, ClickAwayListener, ToggleButton } from "@mui/material";
import { ChromePicker } from "react-color";

interface Car {
    name: string;
    color: string;
}

type Props = {
    setCar: any;
    car: Car;
}

export default function ColorPicker({ setCar, car }: Props) {
    const [active, setActive] = useState(false)

    const handleColor = (color: string) => {
        setCar((prev: Car) => ({ ...prev, color: color }))
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => setActive(false)}>
                <Box position={'relative'} >
                    <ToggleButton
                        value={car?.color}
                        onClick={() => setActive(true)}
                        sx={{
                            backgroundColor: car?.color,
                            border: '1px solid white',
                            "&:hover": {
                                backgroundColor: car?.color,
                                border: '1px solid white'
                            }
                        }}
                    >
                    </ToggleButton>
                    <Box
                        position={'absolute'}
                        zIndex={10}
                        sx={{
                            top: '33px',
                            left: '0px'
                        }}
                    >
                        {active && <ChromePicker
                            color={car?.color}
                            onChange={(e) => handleColor(e?.hex)}
                            onChangeComplete={(e) => handleColor(e?.hex)}
                        />}
                    </Box>
                </Box>
            </ClickAwayListener>
        </>
    )
}