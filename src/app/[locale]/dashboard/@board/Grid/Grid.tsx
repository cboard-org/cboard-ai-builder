'use client';
import React from 'react';
import classNames from 'classnames';

import GridBase from './GridBase';
import styles from './Grid.module.css';
import { GridProps } from './GridTypes';

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
  const gridClassName = classNames(styles.grid, className);

  return (
    <div
      className={styles.root}
      style={style}
      //onKeyDown={handleOnKeyDown}
    >
      <GridBase
        className={gridClassName}
        items={items}
        page={0}
        columns={columns}
        dragAndDropEnabled={dragAndDropEnabled}
        onItemDrop={onItemDrop}
        order={order}
        renderEmptyCell={renderEmptyCell}
        renderItem={renderItem}
        rows={rows}
      />
    </div>
  );
}

export default Grid;
