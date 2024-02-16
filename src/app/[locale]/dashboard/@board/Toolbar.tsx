import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

type Props = {
  onEditClick: () => void;
};

export default function Toolbar({ onEditClick }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton onClick={() => onEditClick()}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <DownloadIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <PrintIcon fontSize="small" />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <IconButton>
        <BookmarkBorderIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
