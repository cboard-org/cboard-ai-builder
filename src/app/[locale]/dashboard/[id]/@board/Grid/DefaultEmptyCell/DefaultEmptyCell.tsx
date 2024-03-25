import { ReactNode } from 'react';
import styles from './DefaultEmptyCell.module.css';

export default function DefaultEmptyCell(): ReactNode {
  return <div className={styles.DefaultEmptyCell}></div>;
}
