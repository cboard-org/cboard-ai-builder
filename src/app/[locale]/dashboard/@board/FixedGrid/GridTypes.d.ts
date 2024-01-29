import { ReactNode, CSSProperties, LegacyRef } from 'react';

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
  isScroll?: boolean; //Is scroll
  style?: CSSProperties; //Inline style
  setIsScroll?: boolean; // Funtion for change isScroll state
  fixedRef?: LegacyRef<HTMLDivElement> | undefined; //Ref to fixed grid container
  isBigScrollBtns?: boolean; //Is navigation buttons on the side
  isNavigationButtonsOnTheSide?: boolean; //Is navigation buttons on the side
}

export interface GridBaseProps extends Props {
  page: number;
}
