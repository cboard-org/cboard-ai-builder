import React from 'react';
import styles from './styles';
import Box from '@mui/material/Box';
import { INITIAL_CONTENT_ID } from '../constants';
import { Link } from '@/navigation';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';
import Button from '@mui/material/Button';

// type Props = {};

function NewBoardLink() {
  const messages = useTranslations('Dashboard');
  const cleanPrompt = useBoundStore((state) => state.cleanPrompt);
  return (
    <Link onClick={cleanPrompt} href={`/dashboard/${INITIAL_CONTENT_ID}`}>
      <Box sx={styles.linkContent}>
        <Tooltip title={messages('createNewBoard')}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddBoxIcon />}
            sx={styles.newBoardButton}
          >
            {messages('newBoard')}
          </Button>
        </Tooltip>
      </Box>
    </Link>
  );
}

export default NewBoardLink;
