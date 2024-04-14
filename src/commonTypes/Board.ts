import { Grid } from '@/commonTypes/Grid';
import { TileRecord } from '@/commonTypes/Tile';
import { PromptRecord } from './Prompt';

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
  name?: string;
  prevId?: string;
  focusedTileId?: string;
  promptId?: string;
  prompt?: PromptRecord;
  createdAt: Date | string;
  updatedAt: Date | string;
};
