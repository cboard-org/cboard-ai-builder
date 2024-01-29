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

interface Props {
  items: Item[]; //Items to render.
  rows: number; //Number of rows
  columns: number; //Number of columns
  order: GridOrder; //Items order by ID.
  dragAndDropEnabled: boolean; //If `true`, items can be dragged and dropped.
  renderEmptyCell: () => ReactNode; // Render empty cell
  renderItem: (
    item: { id: string | number; color: string; label: string },
    itemIndex: number,
  ) => ReactNode; // Item renderer.
  onItemDrop: (
    item: ReactNode,
    position: { row: number; column: number },
  ) => void; //
  className?: string; //Classname
}

export interface GridProps extends Props {
  style?: CSSProperties; //Inline style
}

export interface GridBaseProps extends Props {
  page: number;
}