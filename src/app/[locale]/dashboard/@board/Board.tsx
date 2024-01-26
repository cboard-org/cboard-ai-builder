import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NorthEast from '@mui/icons-material/NorthEast';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Grid from './Grid';

export default function Board() {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          // border: '2px solid red',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          p: '.5rem',
          backgroundColor: '#f8f8f8',
        }}
      >
        <Box
          sx={{
            height: '12%',
            //border: '2px solid blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box>Image</Box>
            <Box>| Board title</Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <IconButton>
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
        </Box>
        <Divider flexItem sx={{ my: '0.5rem' }} />
        <Box
          sx={{
            flexGrow: 1,
            // border: '2px solid grey'
          }}
        >
          <Box sx={{ maxWidth: '1500px', overflowX: 'scroll' }}>
            <Grid />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          pt: '0.5rem',
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<NorthEast />}
          sx={{ fontSize: '0.7rem' }}
        >
          Export to Cboard
        </Button>
      </Box>
    </Box>
  );
}
