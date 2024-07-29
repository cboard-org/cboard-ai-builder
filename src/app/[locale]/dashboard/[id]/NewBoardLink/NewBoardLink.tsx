import React from 'react';
import styles from './styles';
import Box from '@mui/material/Box';
import { INITIAL_CONTENT_ID } from '../constants';
import { Link } from '@/navigation';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';

// type Props = {};

function NewBoardLink() {
  return (
    <Link href={`/dashboard/${INITIAL_CONTENT_ID}`}>
      <Box sx={styles.linkContent}>
        {/* translate */}
        <Tooltip title="New board">
          <IconButton>
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Link>
  );
}

export default NewBoardLink;
