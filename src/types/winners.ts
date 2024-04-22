export type IWinnerItem = {
  id: number;
  wins: number;
  time: number;
  name?: string;
  velocity?: number;
};

export type WinnersValueProps = {
  wCurrentPage: number;
  winners: IWinnerItem[];
  wTotalCount: number;
  _limit: number;
  wNeedToUpdate: boolean;
};

export type WinnersContextProps = WinnersValueProps & {
  reset: () => void;
  update: (key: string, value: any) => void;
  nextPage: () => void;
  prevPage: () => void;
};
