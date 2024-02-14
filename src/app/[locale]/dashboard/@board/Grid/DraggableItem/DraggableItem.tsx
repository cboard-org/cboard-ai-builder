import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd';

import styles from './DraggableItem.module.css';

type Props = {
  disabled: boolean;
  id: string;
  type: string;
  children: ReactNode;
};

function DraggableItem({ disabled, id, type, children }: Props) {
  const [{ opacity }, drag] = useDrag({
    type: type,
    item: () => ({ id }),
    canDrag: () => !disabled,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div className={styles.root} style={{ opacity }} ref={drag}>
      {children}
    </div>
  );
}

export default DraggableItem;
