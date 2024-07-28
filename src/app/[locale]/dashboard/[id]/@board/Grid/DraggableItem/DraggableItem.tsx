import React, { ReactNode } from 'react';
import styles from './DraggableItem.module.css';

type Props = {
  disabled: boolean;
  id: string;
  type: string;
  children: ReactNode;
};

function DraggableItem({ children }: Props) {
  return <div className={styles.root}>{children}</div>;
}

export default DraggableItem;
