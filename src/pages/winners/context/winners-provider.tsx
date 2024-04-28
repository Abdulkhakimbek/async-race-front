import { useMemo } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';
import { WinnersValueProps } from 'src/types/winners';
import { WinnersContext } from './winners-context';

const STORAGE_KEY = 'garage';

type WinnersProviderProps = {
  children: React.ReactNode;
  defaultValues: WinnersValueProps;
};

export function WinnersStateProvider({ children, defaultValues }: WinnersProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultValues);
  const { wCurrentPage } = state;

  const nextPage = () => {
    update('wCurrentPage', wCurrentPage + 1);
  };

  const prevPage = () => {
    update('wCurrentPage', wCurrentPage - 1);
  };

  const memoizedValue = useMemo(
    () => ({
      ...state,
      reset,
      update,
      nextPage,
      prevPage,
    }),
    [reset, update, state, nextPage, prevPage]
  );

  return <WinnersContext.Provider value={memoizedValue}>{children}</WinnersContext.Provider>;
}
