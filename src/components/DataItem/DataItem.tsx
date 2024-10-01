import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useFormatter } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { Modal, Button } from '@mui/material';
import { PromptRecord } from '@/commonTypes/Prompt';
import { useShallow } from 'zustand/react/shallow';
import InternalLink from '../InternalLink/InternalLink';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';

import sxStyles from './styles';
import './sidebar.css';

export type BaseDataItemType = {
  id: string;
  isSavedBoard?: boolean;
  prompt: PromptRecord;
  date: Date | string;
};

type Props<DataType extends BaseDataItemType> = {
  data: DataType;
  deleteItem: {
    deleteData: (data: DataType) => void;
    isDeleting: boolean;
  };
};

export default function DataItem<DataType extends BaseDataItemType>({
  data,
  deleteItem: { deleteData },
}: Props<DataType extends BaseDataItemType>) {
  const router = useRouter();
  const { description, rows, columns, colorScheme, shouldUsePictonizer } =
    data.prompt;
  const format = useFormatter();
  const isSmallScreen = useIsSmallScreen();

  const [isOutdated] = useBoundStore(useShallow((state) => [state.isOutdated]));

  const cleanPrompt = useBoundStore((state) => state.cleanPrompt);
  const { boardLeaveStatus, setBoardLeaveStatus } = useBoundStore((state) => ({
    boardLeaveStatus: state.boardLeaveStatus,
    setBoardLeaveStatus: state.setBoardLeaveStatus,
  }));
  const { boardLeaveDialogStatus, setBoardLeaveDialogStatus } = useBoundStore(
    (state) => ({
      boardLeaveDialogStatus: state.boardLeaveDialogStatus,
      setBoardLeaveDialogStatus: state.setBoardLeaveDialogStatus,
    }),
  );

  const [setPrompt, isGenerationPending, toogleIsSidebarOpen] = useBoundStore(
    useShallow((state) => [
      state.setPrompt,
      state.isGenerationPending,
      state.toogleIsSidebarOpen,
    ]),
  );

  const closeDialog = () => setBoardLeaveDialogStatus(false);

  const handleNotSave = () => {
    if (boardLeaveStatus == 'new') {
      cleanPrompt();
      router.push('/board');
      setBoardLeaveStatus('');
    } else if (boardLeaveStatus == 'edit') {
      const { description, rows, columns, colorScheme, shouldUsePictonizer } =
        data.prompt;
      setPrompt({description, rows, columns, colorScheme, shouldUsePictonizer});
      data.isSavedBoard
        ? router.push(`/board/${data.id}`)
        : router.push('/board');
      console.log(prompt);
      setBoardLeaveStatus('');
    }
    closeDialog();
  };

  const onEdit = () => {
    if (isSmallScreen) {
      toogleIsSidebarOpen();
    }

    if (!isOutdated) {
      setPrompt({
        description,
        rows,
        columns,
        colorScheme,
        shouldUsePictonizer,
      });
      data.isSavedBoard
        ? router.push(`/board/${data.id}`)
        : router.push('/board');
    } else {
      setBoardLeaveDialogStatus(true);
      setBoardLeaveStatus(data);
    }
  };
  return (
    <>
      <ListItem
        divider
        secondaryAction={
          <Box>
            <IconButton
              disabled={isGenerationPending}
              aria-label="Edit"
              onClick={onEdit}
              size="small"
            >
              <EditOutlined fontSize="small" />
            </IconButton>
            <IconButton
              disabled={isGenerationPending}
              aria-label="Delete"
              onClick={() => deleteData(data)}
              size="small"
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <Tooltip title={description} arrow>
          <ListItemText
            primary={description}
            primaryTypographyProps={{
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
            secondary={format.relativeTime(new Date(data.date))}
            sx={{ pr: 4 }}
            aria-multiline="false"
          />
        </Tooltip>
      </ListItem>
      <Modal
        open={boardLeaveDialogStatus}
        onClose={closeDialog}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={sxStyles.dialog}>
          <h1 id="modal-title" className="text-center">
            You didn't save the board
          </h1>
          <div className="text-center margin-top-20">
            <Button
              variant="outlined"
              sx={sxStyles.button}
              onClick={handleNotSave}
            >
              Don't Save
            </Button>
            <Button variant="outlined" onClick={closeDialog}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
