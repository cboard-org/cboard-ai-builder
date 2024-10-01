import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useShallow } from 'zustand/react/shallow';

function NewBoardLink() {
  const router = useRouter();
  const cleanPrompt = useBoundStore((state) => state.cleanPrompt);
  const { setBoardLeaveDialogStatus } = useBoundStore((state) => ({
    setBoardLeaveDialogStatus: state.setBoardLeaveDialogStatus,
  }));

  const [isOutdated] = useBoundStore(useShallow((state) => [state.isOutdated]));

  const setBoardLeaveStatus = useBoundStore(
    (state) => state.setBoardLeaveStatus,
  );
  const handleClick = () => {
    if (!isOutdated) {
      cleanPrompt();
      router.push('/board');
    } else {
      setBoardLeaveDialogStatus(true);
      setBoardLeaveStatus('new');
    }
  };
  return (
    <div onClick={handleClick}>
      <Box sx={styles.linkContent}>
        <Box sx={styles.smallDevices}>
          <NewBoardIconButton />
        </Box>
        <Box sx={styles.largeDevices}>
          <NewBoardButton />
        </Box>
      </Box>
    </div>
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
  const [setIsSidebarOpen] = useBoundStore(
    useShallow((state) => [state.setIsSidebarOpen]),
  );
  return (
    <IconButton color="primary" onClick={() => setIsSidebarOpen(false)}>
      <AddBoxIcon />
    </IconButton>
  );
};

export default NewBoardLink;
