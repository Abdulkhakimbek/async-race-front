import { Box } from "@mui/material";
import Iconify from "src/components/iconify";


export default function Track() {
    return (
        <>
            <Box
                border={'1px solid white'}
                borderRight={'none'}
                borderLeft={'none'}
            >

                <Iconify
                    width="auto"
                    height="50px"
                    fontSize="60px"
                    color="#1BBA59"

                    icon={'game-icons:race-car'}
                />
            </Box>
        </>
    )
}