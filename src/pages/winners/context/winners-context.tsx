import { useContext, createContext } from 'react';

import { WinnersContextProps } from 'src/types/winners';

export const WinnersContext = createContext({} as WinnersContextProps);

export const useWinnersContext = () => {
  const context = useContext(WinnersContext);

  if (!context) throw new Error('useGarageContext must be use inside SettingsProvider');

  return context;
};
