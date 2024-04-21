import { Box, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { ICarItem } from 'src/types/car';
import { useEffect, useState, useRef } from 'react';
import TrackAction from './track-action-panel';

type Props = {
    car: ICarItem;
};

export default function Track({ car }: Props) {
  const [moveCar, setMoveCar] = useState(false);
  const carRef = useRef<HTMLDivElement>(null);
  let baseVelocity = car?.velocity || 0;
  const animationDuration = car?.velocity ? `${1000 / baseVelocity}s` : `${baseVelocity}s`;

  if ('drive' in car && car.drive === false) {
    baseVelocity = 0;
  }
  useEffect(() => {
    console.log('carRef>>>', carRef.current?.style.left, car);
  }, [carRef?.current, car]);

  useEffect(() => {
    if (car?.velocity) {
      setMoveCar(true);
    } else {
      setMoveCar(false);
    }
  }, [car]);

  return (
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
        ref={carRef}
        sx={{
          position: 'absolute',
          width: '100%',
          left: moveCar ? '95%' : '12%',
          top: '15%',
          zIndex: '10',
          transition: `left ${animationDuration} linear`,
        }}
      >
        <Iconify
          width="auto"
          height="50px"
          fontSize="60px"
          marginLeft="10px"
          color={car.color}
          icon="game-icons:race-car"
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          left: '17%',
          top: '0%',
          zIndex: '1',
          borderLeft: '2px dashed #ed6c02', // start line
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
        >
          {car.name}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: '4%',
          top: '0%',
          zIndex: '1',
          borderLeft: '2px dashed #2e7d32', // finish line
          height: '100%',
          paddingLeft: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </Box>
  );
}
