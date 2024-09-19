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
import { Link } from '@/navigation';
import { INITIAL_CONTENT_ID } from '@/app/[locale]/(dashboard)/constants';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useIsInitialContentView from '@/app/[locale]/(dashboard)/board/[id]/hooks/useIsInitialContentView';
import { usePathname } from 'next/navigation';

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
  deleteItem: { deleteData, isDeleting },
}: Props<DataType>) {
  const { description, rows, columns, colorScheme, shouldUsePictonizer } =
    data.prompt;
  const format = useFormatter();
  const [setPrompt, isGenerationPending] = useBoundStore(
    useShallow((state) => [state.setPrompt, state.isGenerationPending]),
  );
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isInitialContentView = useIsInitialContentView();

  const pathname = usePathname();

  const onEdit = () => {
    if (
      (!isInitialContentView || data.isSavedBoard) &&
      !pathname.includes(data.id)
    )
      setIsRedirecting(true);
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
          <Link
            href={
              data.isSavedBoard //Replace this with boardId
                ? `/board/${data.id}`
                : `/board/${INITIAL_CONTENT_ID}`
            }
          >
            <IconButton
              disabled={isGenerationPending}
              aria-label="Edit"
              onClick={() => onEdit()}
              size="small"
            >
              {isRedirecting ? (
                <CircularProgress size={24} />
              ) : (
                <EditOutlined fontSize="small" />
              )}
            </IconButton>
          </Link>
          <IconButton
            disabled={isDeleting}
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
