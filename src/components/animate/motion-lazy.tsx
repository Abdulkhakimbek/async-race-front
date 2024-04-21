import { m, domMax, LazyMotion } from 'framer-motion';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div
        style={{
          height: '100%',
          backgroundImage: 'url(/main-layout-background.jpg)',
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
