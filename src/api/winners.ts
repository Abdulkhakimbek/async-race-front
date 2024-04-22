import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, poster, updater, endpoints } from 'src/utils/axios';

import { IWinnerItem } from 'src/types/winners';

// ----------------------------------------------------------------------

export const createWinner = async (data: IWinnerItem) => {
  let res = await axiosInstance.get(`${endpoints.winners.list}?id=${data.id}`);

  let winner = res.data.length > 0 ? res.data[0] : null;
  if (winner && winner.id === data.id) {
    data = {
      id: data.id,
      wins: winner.wins + 1,
      time: Math.min(data.time, winner.time)
    }
    const url = `${endpoints.winners.list}/${data.id}`;
    const resData = await axiosInstance.put(url, data);
    return resData;
  } else {
    data = { id: data.id, wins: 1, time: data.time }
    const resData = await axiosInstance.post(endpoints.winners.list, data);
    return resData;
  }
}

// ----------------------------------------------------------------------

export function useGetWinners(_page: number, _limit: number) {
  const URL = _page
    ? [endpoints.winners.list, { params: { _page, _limit } }]
    : endpoints.winners.list;

  const {
    data, isLoading, error, isValidating, ...rest
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
