'use client';
import React, { ReactNode } from 'react';
import { Item } from './types';
import { GridOrder } from '@/commonTypes/Grid';
import styles from './Grid.module.css';
import * as utils from './gridManipulation';
import Row from './Row/Row';
import DroppableCell from './DroppableCell/DroppableCell';
import DraggableItem from './DraggableItem/DraggableItem';
import DefaultEmptyCell from './DefaultEmptyCell/DefaultEmptyCell';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

type Props = {
  items: Item[]; //Items to render.
  rows: number; //Number of rows
  columns: number; //Number of columns
  order: GridOrder; //Items order by ID.
  dragAndDropEnabled: boolean; //If `true`, items can be dragged and dropped.
  renderItem: (
    item: {
      id: string;
      color: string;
      label: string;
      backgroundColor: string;
    },
    itemIndex: number,
  ) => ReactNode; // Item renderer.
  onItemDrop: (
    item: { id: string },
    position: { row: number; column: number },
  ) => void; //
  renderEmptyCell?: () => ReactNode; // Render empty cell
};

const dndOptions = {
  enableTouchEvents: true,
  enableMouseEvents: true,
  enableKeyboardEvents: true,
};

const page = 0;

function Grid({
  items,
  rows,
  columns,
  order,
  onItemDrop,
  dragAndDropEnabled,
  renderEmptyCell,
  renderItem,
}: Props) {
  const grid = utils.sortGrid({ columns, rows, order, items });

  let itemIndex = 0;

  return (
    <DndProvider backend={TouchBackend} options={dndOptions}>
      <div
        className={styles.GridContainer}
        //onKeyDown={handleOnKeyDown}
      >
        <div className={styles.Grid}>
          {grid.map((row, rowIndex) => (
            <Row key={rowIndex.toString()}>
              {row.map((item, columnIndex) => {
                const yPosition = page * rows + rowIndex;
                const idWithPosition = `${columnIndex}-${yPosition}`;
                return (
                  <DroppableCell
                    key={columnIndex.toString()}
                    id={idWithPosition}
                    accept={'grid-item'}
                    onDrop={(item) => {
                      const position = { row: rowIndex, column: columnIndex };

                      onItemDrop(item, position);
                    }}
                  >
                    {item ? (
                      <DraggableItem
                        type={'grid-item'}
                        id={item.id}
                        disabled={!dragAndDropEnabled}
                      >
                        {renderItem(item, itemIndex++)}
                      </DraggableItem>
                    ) : renderEmptyCell ? (
                      renderEmptyCell()
                    ) : (
                      <DefaultEmptyCell />
                    )}
                  </DroppableCell>
                );
              })}
            </Row>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default Grid;
