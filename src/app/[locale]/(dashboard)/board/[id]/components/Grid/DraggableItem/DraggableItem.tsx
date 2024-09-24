import React, { ReactNode, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import styles from './DraggableItem.module.css';

type Props = {
  disabled: boolean;
  id: string;
  type: string;
  children: ReactNode;
};

function DraggableItem({ disabled, id, type, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ opacity }, drag] = useDrag({
    type: type,
    item: () => ({ id }),
    canDrag: () => !disabled,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div className={styles.root} style={{ opacity }} ref={ref}>
      {children}
    </div>
  );
}

export default DraggableItem;
