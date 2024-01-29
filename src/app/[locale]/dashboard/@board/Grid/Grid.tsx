'use client';
import React from 'react';
import classNames from 'classnames';

import styles from './Grid.module.css';
import { GridProps } from './GridTypes';
import * as utils from './utils';
import Row from './Row/Row';
import DroppableCell from './DroppableCell/DroppableCell';
import DraggableItem from './DraggableItem/DraggableItem';

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
  className,
  style,
}: GridProps) {
  const gridClassName = classNames(styles.Grid, className);

  const grid = utils.sortGrid({ columns, rows, order, items });

  let itemIndex = 0;

  return (
    <div
      className={styles.GridContainer}
      style={style}
      //onKeyDown={handleOnKeyDown}
    >
      <div className={gridClassName}>
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
                  ) : (
                    renderEmptyCell && renderEmptyCell()
                  )}
                </DroppableCell>
              );
            })}
          </Row>
        ))}
      </div>
    </div>
  );
}

export default Grid;
