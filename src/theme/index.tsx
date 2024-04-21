import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            '&.Mui-disabled': {
              color: 'rgb(112 106 106 / 63%)',
              border: '1px solid rgb(112 106 106 / 63%)',
            },
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
