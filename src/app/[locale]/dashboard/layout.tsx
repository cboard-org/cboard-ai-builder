import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import styles from './styles.module.css';

const xsSpacing = 1;
const smSpacing = 3;

const sxStyles = {
  dashboardContainer: {
    display: 'grid',
    alignContent: { xs: 'flex-start', sm: 'inherit' },
    flexDirection: { xs: 'column' },
    gridTemplateColumns: { xs: '1fr', sm: '1fr 4fr' },
    gridTemplateRows: {
      xs: 'max-content max-content 1fr',
      sm: 'max-content auto',
    },

    gridTemplateAreas: {
      xs: `"title"
    "sidebar"
    "board"`,
      sm: `"title board board board"
  "sidebar board board board"`,
    },
    columnGap: { xs: xsSpacing, sm: smSpacing },
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
}) {
  return (
    <Box
      py={{ xs: 1, sm: 3 }}
      px={{ xs: 2, sm: 4 }}
      className={styles.dashboardBox}
    >
      <Box
        sx={sxStyles.dashboardContainer}
        className={styles.dashboardContainer}
      >
        <Box className={styles.titleBox}>{props.navbar}</Box>
        <Box sx={sxStyles.sidebar}>
          <Box className={styles.prompt}>{props.promptForm}</Box>
          <Box>{props.history}</Box>
          <Box>
            <Typography sx={{ border: '2px solid black', height: '100%' }}>
              {'Saved AI Boards'}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.board}>
          <Typography sx={{ border: '2px solid black', height: '100%' }}>
            {'Board'}
          </Typography>
        </Box>
        {props.children}
      </Box>
    </Box>
  );
}
