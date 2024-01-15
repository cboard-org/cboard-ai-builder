import { Box, Typography } from '@mui/material';
import * as React from 'react';
import styles from './styles.module.css';
import { useTranslations } from 'next-intl';

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

export default function Dashboard() {
  const message = useTranslations('Dashboard');
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
        <Box className={styles.titleBox}>
          <Typography sx={{ border: '2px solid black' }}>
            {message('menu')}
          </Typography>
        </Box>

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
          <Box>
            <Typography
              sx={{
                border: '2px solid black',
              }}
            >
              {'History'}
            </Typography>
          </Box>
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
      </Box>
    </Box>
  );
}
