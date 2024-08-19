import Box from '@mui/material/Box';
import * as React from 'react';
import { INITIAL_CONTENT_ID } from './constants';
import styles from './styles';

const paddings = { xs: 1, md: 2, lg: 3 };
const sxStyles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    p: paddings,
  },
  board: {
    minHeight: 0,
    flexGrow: 1,
  },
};

export default function Dashboard(props: {
  children: React.ReactNode;
  promptForm: React.ReactNode;
  board: React.ReactNode;
  params: {
    id: string;
  };
}) {
  return (
    <Box sx={sxStyles.container}>
      <Box sx={sxStyles.board}>{props.board}</Box>
      {props.params.id === INITIAL_CONTENT_ID && (
        <Box sx={styles.promptContainer}>{props.promptForm}</Box>
      )}
      {props.children}
    </Box>
  );
}
