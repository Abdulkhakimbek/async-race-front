import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, {
  fetcher,
  endpoints,
} from 'src/utils/axios';

import { IWinnerItem } from 'src/types/winners';

export const createWinner = async (data: IWinnerItem) => {
  const res = await axiosInstance.get(`${endpoints.winners.list}?id=${data.id}`);

  const winner = res.data.length > 0 ? res.data[0] : null;
  if (winner && winner.id === data.id) {
    const body = {
      name: data.name,
      id: data.id,
      wins: winner.wins + 1,
      time: Math.min(!data.time ? 10 : data.time, !winner.time ? 10 : winner.time),
    };
    const url = `${endpoints.winners.list}/${data.id}`;
    const resData = await axiosInstance.put(url, body);
    return resData;
  } else {
    const body = {
      id: data.id,
      name: data.name,
      wins: 1,
      time: 1000 / (data.velocity ?? 100)
    };
    const resData = await axiosInstance.post(endpoints.winners.list, body);
    return resData;
  }
}

// ----------------------------------------------------------------------

export function useGetWinners(_page: number, _limit: number) {
  const URL = _page
    ? [endpoints.winners.list, { params: { _page, _limit } }]
    : endpoints.winners.list;

  const {
    data, isLoading, error, isValidating
  } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      winners: (data?.data as IWinnerItem[]) || [],
      winnersLoading: isLoading,
      winnersError: error,
      winnersValidating: isValidating,
      winnersEmpty: !isLoading && !data?.data?.length,
      totalCount: data?.totalCount,
    }),
    [data?.data, error, isLoading, isValidating],
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetWinner(id: string | number) {
  const URL = id ? [endpoints.winners.details, { params: { id } }] : '';

  const {
    data, isLoading, error, isValidating,
  } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      winner: data?.data as IWinnerItem,
      winnerLoading: isLoading,
      winnerError: error,
      winnerValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating],
  );

  return memoizedValue;
}
