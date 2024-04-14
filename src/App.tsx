import 'src/global.css';

import React from 'react';
import Router from 'src/routes';
import { MotionLazy } from 'src/components/animate/motion-lazy';

export default function App() {
  return (
    <MotionLazy>
      <Router />
    </MotionLazy>
  );
}


