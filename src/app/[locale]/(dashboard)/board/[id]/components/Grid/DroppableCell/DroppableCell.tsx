import React, { ReactNode, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import styles from './DroppableCell.module.css';

type Props = {
  id: string;
  accept: string | symbol | [];
  onDrop: (item: { id: string }) => void;
  children?: ReactNode;
};

function DroppableCell({ id, accept, onDrop, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  const isActive = isOver && canDrop;

  return (
    <div id={id} className={styles.root} data-isactive={isActive} ref={ref}>
      {children}
    </div>
  );
}

export default DroppableCell;
