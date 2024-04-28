import Box from '@mui/material/Box';
import { RightIcon } from './arrow-icons';

export default function ArrowLine({ width = '100%', height = '40px', hasBorder = false, ...rest }) {
  const arr = Array.from(' '.repeat(115));
  return (
    <Box
      overflow="hidden"
      width={width}
      height={height}
      sx={{
        border: hasBorder ? '2px solid white' : 'none',
        borderRight: 'none',
        borderLeft: 'none',
      }}
    >
      {arr.map((_) => (
        <RightIcon {...rest} />
      ))}
    </Box>
  );
}
