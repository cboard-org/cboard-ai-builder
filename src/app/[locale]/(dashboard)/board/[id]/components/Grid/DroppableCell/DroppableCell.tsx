import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

import styles from './DroppableCell.module.css';

type Props = {
  id: string;
  accept: string | symbol | [];
  onDrop: (item: { id: string }) => void;
  children?: ReactNode;
};

function DroppableCell({ id, accept, onDrop, children }: Props) {
  const [{ isOver, canDrop }] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div id={id} className={styles.root} data-isactive={isActive}>
      {children}
    </div>
  );
}

export default DroppableCell;
