import 'src/global.css';

import Router from 'src/routes';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SnackbarProvider } from './components/snackbar';

export default function App() {
  return (
    <MotionLazy>
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </MotionLazy>
  );
}


