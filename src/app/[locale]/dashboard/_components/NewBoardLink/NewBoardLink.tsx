import React from 'react';
import styles from './styles';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InternalLink from '@/components/InternalLink/InternalLink';

function NewBoardLink() {
  const cleanPrompt = useBoundStore((state) => state.cleanPrompt);
  return (
    <InternalLink onClick={cleanPrompt} href="/dashboard" prefetch={true}>
      <Box sx={styles.linkContent}>
        <Box sx={styles.smallDevices}>
          <NewBoardIconButton />
        </Box>
        <Box sx={styles.largeDevices}>
          <NewBoardButton />
        </Box>
      </Box>
    </InternalLink>
  );
}

const NewBoardButton = () => {
  const messages = useTranslations('Dashboard');
  return (
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
  );
};

const NewBoardIconButton = () => {
  return (
    <IconButton color="primary">
      <AddBoxIcon />
    </IconButton>
  );
};

export default NewBoardLink;