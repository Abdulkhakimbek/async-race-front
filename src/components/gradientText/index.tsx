import { Box } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import { textGradient } from 'src/theme/css';
import { styled } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
  variant: 'h1' | 'h4' | 'h5' | 'h6' | 'p';
};

export default function GradientText({ children, variant }: Props) {
  const StyledTextGradient = styled(m[variant] || m.h1)(({ theme }) => ({
    ...textGradient(
      `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
    ),
    padding: 0,
    marginTop: 8,
    lineHeight: 1,
    fontWeight: 800,
    marginBottom: 24,
    letterSpacing: 8,
    textAlign: 'center',
    backgroundSize: '400%',
    fontSize: `${32 / 16}rem`,
    [theme.breakpoints.up('md')]: {
      fontSize: `${48 / 16}rem`,
    },
  }));

  return (
    <Box>
      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          {children}
        </StyledTextGradient>
      </m.div>
    </Box>
  );
}
