import { Grid } from '@/commonTypes/Grid';
import { TileRecord } from '@/commonTypes/Tile';

export type BoardRecord = {
  _id: string;
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
  name?: string;
  prevId?: string;
  focusedTileId?: string;
  promptId?: string;
};
