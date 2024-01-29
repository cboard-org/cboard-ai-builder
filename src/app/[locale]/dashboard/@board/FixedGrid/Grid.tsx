'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import GridBase from './GridBase';
import styles from './Grid.module.css';
import { Item, GridProps } from './GridTypes';

function chunks(array: Item[], size: number) {
  const newArray = [...array];
  const results = [];

  while (newArray.length) {
    results.push(newArray.splice(0, size));
  }

  return results;
}

// const focusPosition = {
//   x: 0,
//   y: 0,
// };

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
  fixedRef,
}: GridProps) {
  const itemsPerPage = rows * columns;
  const [pages, setPages] = useState(chunks(items, itemsPerPage));

  useEffect(() => {
    setPages(chunks(items, itemsPerPage));
  }, [items, itemsPerPage]);

  const gridClassName = classNames(styles.grid, className);

  // const findPressedArrow = event => {
  //   const code = event.code;
  //   const right = code === 'ArrowRight';
  //   const left = code === 'ArrowLeft';
  //   const up = code === 'ArrowUp';
  //   const down = code === 'ArrowDown';

  //   if (!(right || left || up || down)) return null;
  //   event.preventDefault();
  //   if (event.repeat) return null;
  //   return { right, left, up, down };
  // };

  // const setFocusPositionFromFocusedButton = buttonElement => {
  //   const setFocusPositionFromId = id => {
  //     const divider = '-';
  //     const positionArrayXY = id.split(divider);
  //     const xPosition = parseInt(positionArrayXY[0]);
  //     const yPosition = parseInt(positionArrayXY[1]);
  //     focusPosition.x = xPosition;
  //     focusPosition.y = yPosition;
  //   };
  //   if (buttonElement) {
  //     const activeDraggableItem = buttonElement.parentNode;
  //     const activeDroppableCellId = activeDraggableItem?.parentNode?.id;
  //     if (activeDroppableCellId) setFocusPositionFromId(activeDroppableCellId);
  //   }
  // };

  // const handleOnKeyDown = event => {
  //   const keycode = event.code;

  //   const manageArrows = event => {
  //     const setFocusPosition = pressedArrow => {
  //       const { columns, rows } = other;
  //       const totalRows = pages.length * rows;
  //       const { right, left, up, down } = pressedArrow;
  //       const rightLimit = focusPosition.x >= columns - 1;
  //       const leftLimit = focusPosition.x <= 0;
  //       const topLimit = focusPosition.y <= 0;
  //       const bottomLimit = focusPosition.y >= totalRows - 1;
  //       if (right) {
  //         if (rightLimit) {
  //           focusPosition.x = 0;
  //           return;
  //         }
  //         focusPosition.x = focusPosition.x + 1;
  //         return;
  //       }
  //       if (left) {
  //         if (leftLimit) {
  //           focusPosition.x = columns - 1;
  //           return;
  //         }
  //         focusPosition.x = focusPosition.x - 1;
  //         return;
  //       }
  //       if (up) {
  //         if (topLimit) {
  //           focusPosition.y = totalRows - 1;
  //           return;
  //         }
  //         focusPosition.y = focusPosition.y - 1;
  //         return;
  //       }
  //       if (down) {
  //         if (bottomLimit) {
  //           focusPosition.y = 0;
  //           return;
  //         }
  //         focusPosition.y = focusPosition.y + 1;
  //         return;
  //       }
  //     };

  //     const pressedArrow = findPressedArrow(event);
  //     if (!pressedArrow) return;
  //     setFocusPosition(pressedArrow);

  //     const currentId = `${focusPosition.x}-${focusPosition.y}`;
  //     const currentTile = document.getElementById(currentId);

  //     if (currentTile) {
  //       const isAvailableTile = () => {
  //         if (currentTile?.firstChild) {
  //           currentTile.firstChild.querySelector('button').focus();
  //           return true;
  //         }
  //         return false;
  //       };

  //       if (isAvailableTile()) return;
  //     }
  //     manageArrows({
  //       code: keycode,
  //       preventDefault: event.preventDefault,
  //       repeat: false
  //     });
  //   };

  //   const manageTabs = () => {
  //     const tabIsPressed = () => {
  //       const tab = keycode === 'Tab';
  //       if (tab) return true;
  //       return false;
  //     };
  //     if (tabIsPressed()) {
  //       const awaitTabSetNewFocus = () => {
  //         const refreshFocusPosition = () => {
  //           const activeButtonElement = document.activeElement;
  //           setFocusPositionFromFocusedButton(activeButtonElement);
  //         };
  //         setTimeout(refreshFocusPosition, 0);
  //       };
  //       awaitTabSetNewFocus();
  //     }
  //   };

  //   manageArrows(event);
  //   manageTabs();
  // };

  // useEffect(() => {
  //   const manageKeyDown = event => {
  //     if (findPressedArrow(event)) {
  //       const focusIsNotOnTile = () => {
  //         const activeElement = document.activeElement;
  //         const activeElementChildsArray = Array.from(
  //           activeElement?.childNodes
  //         );
  //         if (
  //           activeElementChildsArray.find(
  //             element => element.className === 'Symbol'
  //           )
  //         )
  //           return false;
  //         return true;
  //       };

  //       if (focusIsNotOnTile()) {
  //         const focusFirstTile = () => {
  //           const firstTile = document.getElementsByClassName('Tile')[0];
  //           if (!firstTile) return;
  //           firstTile.focus();
  //           setFocusPositionFromFocusedButton(firstTile);
  //         };

  //         focusFirstTile();
  //       }
  //     }
  //   };

  //   window.addEventListener('keydown', manageKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', manageKeyDown);
  //   };
  // }, []);

  // useEffect(
  //   () => {
  //     if (isBigScrollBtns) {
  //       const isScroll = pages.length > 1 ? true : false;
  //       const totalRows = pages.length * other.rows;
  //       setIsScroll(isScroll, totalRows);
  //     }
  //   },
  //   [items, pages, setIsScroll, other.rows, isBigScrollBtns]
  // );

  return (
    <div
      // className={classNames(styles.root, {
      //   FixedGridScrollButtonsOnTheSides:
      //     isNavigationButtonsOnTheSide && isBigScrollBtns
      // })}
      className={styles.root}
      style={style}
      //onKeyDown={handleOnKeyDown}
      ref={fixedRef}
    >
      {pages.length > 0 ? (
        pages.map((pageItems, i) => (
          <GridBase
            className={gridClassName}
            items={pageItems}
            key={i}
            page={i}
            columns={columns}
            dragAndDropEnabled={dragAndDropEnabled}
            onItemDrop={onItemDrop}
            order={order}
            renderEmptyCell={renderEmptyCell}
            renderItem={renderItem}
            rows={rows}
          />
        ))
      ) : (
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
      )}
    </div>
  );
}

export default Grid;
