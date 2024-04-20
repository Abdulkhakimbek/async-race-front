import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, poster, endpoints } from 'src/utils/axios';

import { IWinnerItem } from 'src/types/winners';

// ----------------------------------------------------------------------

export function useGetWinners(_page: number, _limit: number) {
    const URL = _page ? [endpoints.winners.list, { params: { _page, _limit } }] : endpoints.winners.list;

    const { data, isLoading, error, isValidating, ...rest } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            winners: (data?.data as IWinnerItem[]) || [],
            winnersLoading: isLoading,
            winnersError: error,
            winnersValidating: isValidating,
            winnersEmpty: !isLoading && !data?.data?.length,
            totalCount: data?.totalCount
        }),
        [data?.data, error, isLoading, isValidating]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetWinner(id: string) {
    const URL = id ? [endpoints.winners.details, { params: { id } }] : '';

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            winner: data?.data as IWinnerItem,
            winnerLoading: isLoading,
            winnerError: error,
            winnerValidating: isValidating,
        }),
        [data?.data, error, isLoading, isValidating]
    );

    return memoizedValue;
}
