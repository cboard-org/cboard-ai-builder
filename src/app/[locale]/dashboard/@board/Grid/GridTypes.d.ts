import { ReactNode, CSSProperties } from 'react';

export interface Item {
  id: string;
}

export interface Grid {
  rows: number;
  columns: number;
  order: GridOrder;
}

export type GridOrder = (string | null)[][];

interface GridProps {
  items: Item[]; //Items to render.
  rows: number; //Number of rows
  columns: number; //Number of columns
  order: GridOrder; //Items order by ID.
  dragAndDropEnabled: boolean; //If `true`, items can be dragged and dropped.
  renderItem: (
    item: { id: string | number; color: string; label: string },
    itemIndex: number,
  ) => ReactNode; // Item renderer.
  onItemDrop: (
    item: ReactNode,
    position: { row: number; column: number },
  ) => void; //
  renderEmptyCell?: () => ReactNode; // Render empty cell
  className?: string; //Classname
  style?: CSSProperties; //Inline style
}
