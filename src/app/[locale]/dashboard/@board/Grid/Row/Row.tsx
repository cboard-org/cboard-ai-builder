import React, { ReactNode } from 'react';

import styles from './Row.module.css';

type Props = {
  children?: ReactNode;
};

function Row({ children }: Props) {
  return <div className={styles.root}>{children}</div>;
}
export default Row;
