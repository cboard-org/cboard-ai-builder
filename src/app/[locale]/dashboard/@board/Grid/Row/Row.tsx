import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Row.module.css';

type Props = {
  className?: string;
  children?: ReactNode;
};

function Row({ className, children }: Props) {
  const rowClassName = classNames(styles.root, className);

  return <div className={rowClassName}>{children}</div>;
}
export default Row;
