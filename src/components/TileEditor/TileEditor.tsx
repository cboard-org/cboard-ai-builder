'use client';
import React from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import styles from './styles';

// import { useBoundStore } from '@/providers/StoreProvider';
// import { useShallow } from 'zustand/react/shallow';
// import { useGeneratePictoActive } from '@/components/Symbol/Symbol';
import { TileRecord } from '@/commonTypes/Tile';
// import Button from '@mui/material/Button';
// import ArrowBack from '@mui/icons-material/ArrowBack';
// import ArrowForward from '@mui/icons-material/ArrowForward';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Box from '@mui/material/Box';
// import AppBar from '@mui/material/AppBar';
// import Typography from '@mui/material/Typography';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

import EmblaCarousel from '../ImageCarrousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';

// const useUpdateTileImageSaver = () => {
//   const [updateTileImage, stashDashboard] = useBoundStore(
//     useShallow((state) => [state.updateTileImage, state.stashDashboard]),
//   );
//   const { isStashedContentView } = useGeneratePictoActive();
//   const updateTileImageSaver = (tileId: string, imageUrl: string) => {
//     updateTileImage(tileId, imageUrl);
//     if (isStashedContentView) stashDashboard();
//   };
//   return updateTileImageSaver;
// };

export default function TileEditor({
  children,
  isEditing,
  onClose,
  // tile: { suggestedImages, id: tileId },
  tile,
}: {
  children: React.ReactNode;
  isEditing: boolean;
  onClose: () => void;
  tile: TileRecord;
}) {
  const handleClose = () => {
    onClose();
  };

  // const [selectedImageSuggestion, setSelectedImageSuggestion] = useState(0);

  // const updateTileImageSaver = useUpdateTileImageSaver();

  if (!isEditing) return children;

  // const handleNextImage = () => {
  //   if (!suggestedImages) return;
  //   let nextPosition = selectedImageSuggestion + 1;
  //   if (nextPosition > suggestedImages.length - 1) nextPosition = 0;

  //   updateTileImageSaver(tileId, suggestedImages[nextPosition]);
  //   setSelectedImageSuggestion(nextPosition);
  // };

  // const handlePreviousImage = () => {
  //   if (!suggestedImages) return;
  //   let nextPosition = selectedImageSuggestion - 1;
  //   if (nextPosition < 0) nextPosition = suggestedImages.length - 1;

  //   updateTileImageSaver(tileId, suggestedImages[nextPosition]);
  //   setSelectedImageSuggestion(nextPosition);
  // };

  // const suggestedImagesLength = suggestedImages?.length || 0;
  // const showArrows = suggestedImagesLength > 1;

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  console.log(SLIDES);
  return (
    <>
      {children}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={styles.modal}
      >
        <Paper id="tileEditor" sx={styles.paper}>
          <Box sx={styles.imageControls}>
            <EmblaCarousel
              slides={SLIDES || []}
              options={OPTIONS}
              tileColor={tile.backgroundColor || 'white'}
            />
          </Box>
          {/* <Box sx={styles.imageControls}>
            <Box sx={styles.arrowAndTileContainer}>
              <Button
                disabled={!showArrows}
                onClick={handlePreviousImage}
                sx={styles.arrowButton}
              >
                <ArrowBack fontSize="large" />
              </Button>
              {children}
              <Button
                disabled={!showArrows}
                onClick={handleNextImage}
                sx={styles.arrowButton}
              >
                <ArrowForward fontSize="large" />
              </Button>
            </Box>
            {true && suggestedImagesLength && (
              <ImagePagination
                length={suggestedImagesLength}
                activeImage={selectedImageSuggestion}
              />
            )}
          </Box> */}
        </Paper>
      </Modal>
    </>
  );
}

// const ImagePagination = ({
//   length,
//   activeImage,
// }: {
//   length: number;
//   activeImage: number;
// }) => {
//   const pages = [];
//   for (let i = 1; i <= length; i++) {
//     if (i === activeImage + 1) {
//       pages.push(<RadioButtonCheckedIcon fontSize="inherit" color="primary" />);
//     } else {
//       pages.push(
//         <RadioButtonUncheckedIcon fontSize="inherit" color="primary" />,
//       );
//     }
//   }
//   return (
//     <Box pb={1} sx={{ display: 'flex' }}>
//       {pages}
//     </Box>
//   );
// };
