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
import { BoardRecord } from '@/commonTypes/Board';
import { useShallow } from 'zustand/react/shallow';
import { Link } from '@/navigation';
import { INITIAL_CONTENT_ID } from '@/app/[locale]/dashboard/[id]/constants';
export type BaseDataItemType = {
  id: string;
  prompt: PromptRecord;
  date: Date | string;
  board?: BoardRecord;
};

type Props<DataType extends BaseDataItemType> = {
  data: DataType;
  onDelete: (dataRow: DataType) => void;
};

export default function DataItem<DataType extends BaseDataItemType>({
  data,
  onDelete,
}: Props<DataType>) {
  const { description, rows, columns, colorScheme, shouldUsePictonizer } =
    data.prompt;
  const format = useFormatter();
  const [setPrompt, isGenerationPending] = useBoundStore(
    useShallow((state) => [state.setPrompt, state.isGenerationPending]),
  );

  const onEdit = () => {
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
              data.board //Replace this with boardId
                ? `/dashboard/${data.id}`
                : `/dashboard/${INITIAL_CONTENT_ID}`
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
          </Link>
          <IconButton
            aria-label="Delete"
            onClick={() => onDelete(data)}
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
