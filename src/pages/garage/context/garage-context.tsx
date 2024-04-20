import { useContext, createContext } from 'react';

import { GarageContextProps } from 'src/types/garage';

// ----------------------------------------------------------------------

export const GarageContext = createContext({} as GarageContextProps);

export const useGarageContext = () => {
  const context = useContext(GarageContext);

  if (!context) throw new Error('useGarageContext must be use inside SettingsProvider');

  return context;
};
