import { ICarItem } from './car';
import { IWinnerItem } from './winners';

export type NewCarItem = {
  name: string;
  color: string;
};

export type GarageValueProps = {
  currentPage: number;
  cars: ICarItem[];
  totalCount: number;
  selectedCar: ICarItem | null;
  newCar: NewCarItem;
  _limit: number;
  needToUpdate: boolean;
  winner: IWinnerItem | null;
};

export type GarageContextProps = GarageValueProps & {
  onSelectCar: (car: ICarItem) => void;
  onCreateCar: (car: ICarItem) => void;
  onUpdateCar: (car: ICarItem) => void;
  onDeleteCar: (id: string | number) => void;
  reset: () => void;
  update: (key: string, value: any) => void;
  nextPage: () => void;
  prevPage: () => void;
  manageEngine: (cars: ICarItem[], status: 'started' | 'stopped') => void;
};
