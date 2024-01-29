import React from 'react';
import classNames from 'classnames';

import * as utils from './utils';
import Row from './Row/Row';
import DroppableCell from './DroppableCell/DroppableCell';
import DraggableItem from './DraggableItem/DraggableItem';
import styles from './GridBase.module.css';
import { GridBaseProps } from './GridTypes';

function GridBase({
  items = [],
  rows,
  columns,
  order = [],
  dragAndDropEnabled,
  renderEmptyCell,
  renderItem,
  onItemDrop,
  className,
  page,
}: GridBaseProps) {
  const gridClassName = classNames(styles.root, className);

  const grid = utils.sortGrid({ columns, rows, order, items });

  let itemIndex = 0;

  return (
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
  );
}

export default GridBase;
