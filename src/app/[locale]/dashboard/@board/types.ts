import { Grid } from './Grid/types';

type TileRecord = {
  id: string;
  nameKey?: string;
  label?: string;
  vocalization?: string;
  type?: string;
  backgroundColor?: string;
  labelKey?: string;
  image?: string;
  loadBoard?: string;
  sound?: string;
  linkedBoard?: boolean;
};

export type BoardRecord = {
  id: string;
  isPublic: boolean;
  tiles: TileRecord[];
  isFixed: boolean;
  author: string;
  email: string;
  lastEdited: string;
  grid: Grid;
  cellSize?: string;
  locale?: string;
  format?: string;
  description?: string;
  nameKey?: string;
  caption?: string;
  hidden?: boolean;
};
