import { Box, Stack, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import { ICarItem } from "src/types/car";
import TrackAction from "./track-action-panel";

type Props = {
    car: ICarItem;
}

export default function Track({ car }: Props) {

    const baseDuration = 0;
    const animationDuration = car.speed ? `${baseDuration / car.speed}s` : `${baseDuration}s`;


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    border: '1px solid white',
                    borderRight: 'none',
                    borderLeft: 'none',
                    padding: '5px 0px',
                    position: 'relative',
                }}
            >
                <TrackAction car={car} />
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        left: '12%',
                        top: '15%',
                        zIndex: '1',
                        animation: `moveCar ${animationDuration} linear infinite`, // Apply the animation here
                    }}
                >
                    <Iconify
                        width="auto"
                        height="50px"
                        fontSize="60px"
                        marginLeft={'10px'}
                        color={car.color}
                        icon={'game-icons:race-car'}
                    />
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        left: '17%',
                        top: '0%',
                        zIndex: '1',
                        borderLeft: '2px dashed #ed6c02',
                        height: '100%',
                        paddingLeft: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            opacity: 0.4,
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            fontSize: '18px',
                        }}
                    >{car.name}</Typography>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        right: '4%',
                        top: '0%',
                        zIndex: '1',
                        borderLeft: '2px dashed #2e7d32',
                        height: '100%',
                        paddingLeft: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                </Box>
            </Box>
        </>
    )
}