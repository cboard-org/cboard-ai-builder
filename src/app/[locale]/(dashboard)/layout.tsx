import Box from '@mui/material/Box';
import * as React from 'react';
import Topbar from './components/Topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import SavedData from './components/savedData/SavedData';

const paddings = { xs: 1, md: 2 };
const sxStyles = {
  app: {
    height: '100%',
    display: 'flex',
    p: paddings,
  },
  board: {
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};

export default function Dashboard(props: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={sxStyles.app}>
        <Sidebar>
          <SavedData />
        </Sidebar>

        <Main>
          <Topbar />
          <Box sx={sxStyles.board} component={'main'}>
            {props.children}
          </Box>
        </Main>
      </Box>
    </>
  );
}