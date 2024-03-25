import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './styles.module.css';

const xsSpacing = 3;
const mdSpacing = 2;
const lgSpacing = 2;

const xsPadding = 1;
const mdPadding = 0;

const menuBarHeight = 56;
const sxStyles = {
  dashboardContainer: {
    display: 'grid',
    overflowY: { xs: 'scroll', md: 'unset' },
    alignContent: { xs: 'flex-start', md: 'inherit' },
    flexDirection: { xs: 'column' },
    gridTemplateColumns: { xs: '1fr', md: '1fr 2fr', lg: '1fr 3fr' },
    gridTemplateRows: {
      xs: `max-content calc(100% - ${menuBarHeight}px) max-content`,
      md: 'auto 1fr',
    },

    gridTemplateAreas: {
      xs: `"title"
    "board"
    "sidebar"`,
      md: `"title board"
  "sidebar board"`,
    },
    columnGap: { xs: 0, md: mdSpacing, lg: lgSpacing },
    rowGap: { xs: 0, md: mdSpacing, lg: lgSpacing },
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    rowGap: { xs: xsSpacing, md: mdSpacing, lg: lgSpacing },
    borderRadius: '5px',
  },
};

export default function Dashboard(props: {
  history: React.ReactNode;
  savedBoards: React.ReactNode;
  children: React.ReactNode;
  navbar: React.ReactNode;
  promptForm: React.ReactNode;
  board: React.ReactNode;
  savedData: React.ReactNode;
}) {
  return (
    <Box py={{ xs: 0, md: 2, lg: 3 }} className={styles.dashboardBox}>
      <Box
        px={{ xs: 2, lg: 4 }}
        sx={sxStyles.dashboardContainer}
        className={styles.dashboardContainer}
      >
        <Box py={{ xs: xsPadding, md: mdPadding }} className={styles.titleBox}>
          {props.navbar}
        </Box>
        <Box pb={{ xs: xsSpacing, md: mdPadding }} sx={sxStyles.sidebar}>
          <Box className={styles.controls}>{props.promptForm}</Box>
          <div className={styles.controls}>{props.savedData}</div>
        </Box>
        <Box pb={{ xs: xsSpacing, md: mdPadding }} className={styles.board}>
          {props.board}
        </Box>
        {props.children}
      </Box>
    </Box>
  );
}
