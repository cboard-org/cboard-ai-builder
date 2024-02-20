import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useFormatter } from 'next-intl';

import Box from '@mui/material/Box';

type BaseDataType = {
  prompt: string;
  date: Date | string;
};

type Props<DataType extends BaseDataType> = {
  data: DataType;
  onDelete: (dataRow: DataType) => void;
};

export default function DataItem<DataType extends BaseDataType>({
  data,
  onDelete,
}: Props<DataType>) {
  const format = useFormatter();

  return (
    <ListItem
      divider
      secondaryAction={
        <Box>
          <IconButton size="small">
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton onClick={() => onDelete(data)} size="small">
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={data.prompt}
        secondary={format.relativeTime(new Date(data.date))}
        sx={{ pr: 4 }}
      />
    </ListItem>
  );
}
