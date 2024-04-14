import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import EditingToolbar from './EditingToolbar';

type Props = {
  isEditing: boolean;
};

export default function Toolbar({ isEditing }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      {!isEditing ? <DefaultToolbar /> : <EditingToolbar />}

      <Divider orientation="vertical" flexItem />
      <IconButton>
        <BookmarkBorderIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

const DefaultToolbar = ({}) => {
  // const [isFullscreen, setisFullscreen] = useState(false);

  // const toggleFullscreen = () => {
  //   if (!document.fullscreenElement) {
  //     //if not fullscreen
  //     document.documentElement.requestFullscreen();
  //     setisFullscreen(true);
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //       setisFullscreen(false);
  //     }
  //   }
  // };

  return (
    <>
      {/* <IconButton onClick={toggleFullscreen}>
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      <IconButton>
        <EditIcon fontSize="small" />
      </IconButton> */}
      <IconButton>
        <DownloadIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <PrintIcon fontSize="small" />
      </IconButton>
    </>
  );
};
