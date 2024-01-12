import { Box, Grid, Hidden, Typography } from '@mui/material';
import * as React from 'react';
import styles from './styles.module.css';

const xsSpacing = 1;
const smSpacing = 3;

export default function Dashboard() {
  return (
    <Box p={{ xs: 2, sm: 4 }} className={styles.dashboardBox}>
      <Grid container className={styles.dashboardContainer}>
        <Grid
          item
          container
          sm={3}
          direction="column"
          wrap="nowrap"
          pr={{ sm: smSpacing }}
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item>
            <Typography sx={{ border: '2px solid black' }}>
              {'Menu and title '}
            </Typography>
          </Grid>
          <Grid
            item
            // sm={3}
            direction="column"
            container
            wrap="nowrap"
            rowSpacing={{ xs: xsSpacing, sm: smSpacing }}
          >
            <Grid item className={styles.prompt}>
              <Typography sx={{ border: '2px solid black', height: '100%' }}>
                {'Prompt'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ border: '2px solid black', height: '100%' }}>
                {'History'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ border: '2px solid black', height: '100%' }}>
                {'Saved AI Boards'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          pt={{ xs: xsSpacing, sm: 0 }}
          pb={{ xs: xsSpacing, sm: 0 }}
          className={styles.board}
        >
          <Typography sx={{ border: '2px solid black', height: '100%' }}>
            {'Board'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
