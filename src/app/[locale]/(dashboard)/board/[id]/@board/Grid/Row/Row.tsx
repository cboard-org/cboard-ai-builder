import React from 'react';

import styles from './Row.module.css';

function Row({ children }: React.PropsWithChildren) {
  return <div className={`${styles.root} printTilesRow`}>{children}</div>;
}
export default Row;
