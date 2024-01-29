import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import styles from './DraggableItem.module.css';

type Props = {
  disabled: boolean;
  id: string;
  style?: object;
  type: string;
  className?: string;
  children: ReactNode;
};

function DraggableItem({
  disabled,
  id,
  style,
  type,
  className,
  children,
}: Props) {
  const [{ opacity }, drag] = useDrag({
    type: type,
    item: () => ({ id }),
    canDrag: () => !disabled,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const cellStyle = { ...style, opacity };
  const cellClassName = classNames(styles.root, className);

  return (
    <div className={cellClassName} style={cellStyle} ref={drag}>
      {children}
    </div>
  );
}

export default DraggableItem;
