import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import styles from './styles.module.css';

const xsSpacing = 1;
const smSpacing = 3;
const menuBarHeight = 56;
const sxStyles = {
  dashboardContainer: {
    display: 'grid',
    overflowY: { xs: 'scroll', sm: 'unset' },
    alignContent: { xs: 'flex-start', sm: 'inherit' },
    flexDirection: { xs: 'column' },
    gridTemplateColumns: { xs: '1fr', sm: '1fr 3fr' },
    gridTemplateRows: {
      xs: `max-content max-content calc(100% - ${menuBarHeight}px);`,
      sm: 'auto 1fr',
    },

    gridTemplateAreas: {
      xs: `"title"
    "sidebar"
    "board"`,
      sm: `"title board"
  "sidebar board"`,
    },
    columnGap: { xs: 0, sm: smSpacing },
    rowGap: { xs: xsSpacing, sm: smSpacing },
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    rowGap: { xs: xsSpacing, sm: smSpacing },
  },
};

export default function Dashboard(props: {
  history: React.ReactNode;
  children: React.ReactNode;
  navbar: React.ReactNode;
  promptForm: React.ReactNode;
  board: React.ReactNode;
}) {
  return (
    <Box py={{ xs: 0, sm: 3 }} className={styles.dashboardBox}>
      <Box
        px={{ xs: 2, sm: 4 }}
        sx={sxStyles.dashboardContainer}
        className={styles.dashboardContainer}
      >
        <Box py={{ xs: xsSpacing, sm: 0 }} className={styles.titleBox}>
          {props.navbar}
        </Box>
        <Box sx={sxStyles.sidebar}>
          <Box className={styles.prompt}>{props.promptForm}</Box>
          <Box>{props.history}</Box>
          <Box>
            <Typography sx={{ border: '2px solid black', height: '100%' }}>
              {'Saved AI Boards'}
            </Typography>
          </Box>
        </Box>
        <Box pb={{ xs: xsSpacing, sm: 0 }} className={styles.board}>
          {props.board}
        </Box>
        {props.children}
      </Box>
    </Box>
  );
}
