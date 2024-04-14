import { useState } from "react";
import { Box, ClickAwayListener, ToggleButton } from "@mui/material";
import { ChromePicker } from "react-color";

export default function ColorPicker() {
    const [color, setColor] = useState('#ffffff')
    const [active, setActive] = useState(false)

    return (
        <>
            <ClickAwayListener onClickAway={() => setActive(false)}>
                <Box position={'relative'} >
                    <ToggleButton
                        value={color}
                        onClick={() => setActive(true)}
                        sx={{
                            backgroundColor: color,
                            border: '1px solid white',
                            "&:hover": {
                                backgroundColor: color,
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
                            color={color}
                            onChange={(e) => setColor(e.hex)}
                            onChangeComplete={(e) => setColor(e.hex)}
                        />}

                    </Box>
                </Box>
            </ClickAwayListener>
        </>
    )
}