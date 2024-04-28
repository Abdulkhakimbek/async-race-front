import { Stack } from '@mui/material';
import ArrowLine from 'src/components/arrrowLine';

type Props = {
  children?: React.ReactNode;
};

export default function TrackBorder({ children }: Props) {
  return (
    <>
      <ArrowLine width="100%" hasBorder />
      <Stack
        direction="column"
        padding="0px 0px"
        // minWidth="1350px"
        overflow="hidden"
        width="100%"
      >
        {children}
      </Stack>
      <ArrowLine width="100%" hasBorder />
    </>
  );
}
