import Iconify, { IconifyProps } from '../iconify';

type Props = {
  isRTL?: boolean;
};

export function RightIcon({
  isRTL,
  ...rest
}: Props) {

  return (
    <Iconify
      width="auto"
      height="40px"
      fontSize="40px"
      color="white"
      icon="ic:outline-double-arrow"
      {...rest}
      sx={{
        ...(isRTL && {
          transform: ' scaleX(-1)',
        }),
      }}
    />
  );
}
