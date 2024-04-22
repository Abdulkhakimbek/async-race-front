import 'src/global.css';
/* eslint-disable */

import Router from 'src/routes';
import ThemeProvider from 'src/theme';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SnackbarProvider } from './components/snackbar';

export default function App() {
  return (
    <ThemeProvider>
      <MotionLazy>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </MotionLazy>
    </ThemeProvider>
  );
}
