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
import { PromptRecord } from '@/commonTypes/Prompt';
import { useShallow } from 'zustand/react/shallow';
import InternalLink from '../InternalLink/InternalLink';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';

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
}: Props<DataType>) {
  const router = useRouter();
  const { description, rows, columns, colorScheme, shouldUsePictonizer } =
    data.prompt;
  const format = useFormatter();
  const isSmallScreen = useIsSmallScreen();

  const {
    isOutdated,
    setBoardLeaveStatus,
    setBoardLeaveDialogStatus,
    setPrompt,
    isGenerationPending,
    toogleIsSidebarOpen,
  } = useBoundStore(
    useShallow((state) => ({
      isOutdated: state.isOutdated,
      setBoardLeaveStatus: state.setBoardLeaveStatus,
      setBoardLeaveDialogStatus: state.setBoardLeaveDialogStatus,
      setPrompt: state.setPrompt,
      isGenerationPending: state.isGenerationPending,
      toogleIsSidebarOpen: state.toogleIsSidebarOpen,
    })),
  );

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
    </>
  );
}
