import { createSvgIcon } from '@mui/material/utils';

export const RowsIcon = createSvgIcon(
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 0.5H0V20.5H20V0.5ZM2 6.5V2.5H18V6.5H2ZM2 12.5V8.5H18V12.5H2ZM2 18.5V14.5H18V18.5H2Z"
      fill="#323232"
    />
  </svg>,
  'Rows',
);
export const ColumnsIcon = createSvgIcon(
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 20,20.5 V 0.5 H 0 v 20 z m -6,-18 h 4 v 16 h -4 z m -6,0 h 4 v 16 H 8 Z m -6,0 h 4 v 16 H 2 Z"
      fill="#323232"
    />
  </svg>,
  'Columns',
);
