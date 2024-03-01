import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useFormatter } from 'next-intl';
import { usePromptStore } from '@/providers/PromptStoreProvider';

import Box from '@mui/material/Box';
import { Prompt } from '@/app/[locale]/dashboard/types';

export type BaseDataItemType = {
  prompt: Prompt;
  date: Date | string;
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
  const { setPrompt } = usePromptStore((store) => store);
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
          <IconButton aria-label="Edit" onClick={() => onEdit()} size="small">
            <EditOutlined fontSize="small" />
          </IconButton>
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
