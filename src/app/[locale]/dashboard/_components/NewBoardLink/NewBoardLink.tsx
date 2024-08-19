import React from 'react';
import styles from './styles';
import Box from '@mui/material/Box';
import { INITIAL_CONTENT_ID } from '../../[id]/constants';
import { Link } from '@/navigation';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';

// type Props = {};

function NewBoardLink() {
  const messages = useTranslations('Dashboard');
  const cleanPrompt = useBoundStore((state) => state.cleanPrompt);
  return (
    <Link onClick={cleanPrompt} href={`/dashboard/${INITIAL_CONTENT_ID}`}>
      <Box sx={styles.linkContent}>
        <Tooltip title={messages('newBoard')}>
          <IconButton>
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Link>
  );
}

export default NewBoardLink;
