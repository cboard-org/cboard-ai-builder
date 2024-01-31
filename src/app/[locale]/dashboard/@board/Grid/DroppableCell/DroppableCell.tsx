import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';

import styles from './DroppableCell.module.css';

type Props = {
  id: string;
  accept: string | symbol | [];
  className?: string;
  onDrop: (item: { id: string | number }) => void;
  children?: ReactNode;
};

function DroppableCell({ id, accept, className, onDrop, children }: Props) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  const cellClassName = classNames(styles.root, className, {
    [styles.isActive]: isActive,
  });

  return (
    <div id={id} className={cellClassName} ref={drop}>
      {children}
    </div>
  );
}

export default DroppableCell;
