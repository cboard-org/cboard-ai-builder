import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useFormatter } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';

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
  const { description, rows, columns, colorScheme, shouldUsePictonizer } =
    data.prompt;
  const format = useFormatter();
  const isSmallScreen = useIsSmallScreen();

  const [setPrompt, isGenerationPending, toogleIsSidebarOpen] = useBoundStore(
    useShallow((state) => [
      state.setPrompt,
      state.isGenerationPending,
      state.toogleIsSidebarOpen,
    ]),
  );

  const onEdit = () => {
    if (isSmallScreen) {
      toogleIsSidebarOpen();
    }

    setPrompt({
      description,
      rows,
      columns,
      colorScheme,
      shouldUsePictonizer,
    });
  };
  return (
    <ListItem
      divider
      secondaryAction={
        <Box>
          <InternalLink
            href={
              data.isSavedBoard //Replace this with boardId
                ? `/board/${data.id}`
                : `/board`
            }
          >
            <IconButton
              disabled={isGenerationPending}
              aria-label="Edit"
              onClick={() => onEdit()}
              size="small"
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          </InternalLink>
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
  );
}
