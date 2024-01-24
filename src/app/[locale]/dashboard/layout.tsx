import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import styles from './styles.module.css';

const xsSpacing = 1;
const smSpacing = 2;

const sxStyles = {
  dashboardContainer: {
    display: 'grid',
    alignContent: { xs: 'flex-start', sm: 'inherit' },
    flexDirection: { xs: 'column' },
    gridTemplateColumns: { xs: '1fr', sm: '1fr 3fr' },
    gridTemplateRows: {
      xs: '7% 93% auto',
      sm: '50px auto',
    },

    gridTemplateAreas: {
      xs: ` "title"
            "board"
            "sidebar"`,
      sm: ` "title board"
            "sidebar board"`,
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
  board: React.ReactNode;
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
          <Box className={styles.prompt}>
            <Typography
              sx={{
                border: '2px solid black',
              }}
            >
              {'Prompt'}
            </Typography>
          </Box>
          <Box>{props.history}</Box>
          <Box>
            <Typography sx={{ border: '2px solid black', height: '100%' }}>
              {'Saved AI Boards'}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.board}>{props.board}</Box>
        {props.children}
      </Box>
    </Box>
  );
}
