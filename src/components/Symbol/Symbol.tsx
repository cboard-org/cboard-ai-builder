import React, { useCallback, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';
import { LabelPositionRecord } from '@/commonTypes/Tile';
import { createPicto } from '@/app/[locale]/dashboard/[id]/@board/actions';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import CircularProgress from '@mui/material/CircularProgress';
import { usePathname } from '@/navigation';
import { STASHED_CONTENT_ID } from '@/app/[locale]/dashboard/[id]/constants';
import GenerateButton from './GenerateButton';
import Box from '@mui/material/Box';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import styles from './styles';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

type Props = {
  label: string | undefined;
  labelpos: LabelPositionRecord;
  image: string | undefined;
  tileId: string;
  isEditingImage?: boolean;
  suggestedImages: string[] | null;
};
const useUpdateTileImage = (
  tileId: string,
  image: string = '',
  generatedPicto: string,
) => {
  const [updateTileImage, stashDashboard] = useBoundStore(
    useShallow((state) => [state.updateTileImage, state.stashDashboard]),
  );
  const { isStashedContentView, isPictoGenerationActive } =
    useGeneratePictoActive();

  useEffect(() => {
    if (image === '' && isPictoGenerationActive) {
      updateTileImage(tileId, generatedPicto);
      if (isStashedContentView) stashDashboard();
    }
  }, [
    updateTileImage,
    image,
    generatedPicto,
    tileId,
    stashDashboard,
    isStashedContentView,
    isPictoGenerationActive,
  ]);
};

const useGeneratePictoActive = () => {
  const [prompt] = useBoundStore(useShallow((state) => [state.prompt]));
  const pathname = usePathname();
  const isStashedContentView = pathname.includes(
    `/dashboard/${STASHED_CONTENT_ID}`,
  );
  const isShouldUsePictonizer = prompt.shouldUsePictonizer;
  return {
    isPictoGenerationActive: isShouldUsePictonizer && isStashedContentView,
    isStashedContentView,
    isShouldUsePictonizer,
  };
};

export default function Symbol({
  label,
  labelpos,
  image,
  tileId,
  isEditingImage = false,
  suggestedImages,
}: Props) {
  const [src, setSrc] = React.useState<string | null>(null);
  const symbolClassName = style.Symbol;
  const [generatedPicto, setGeneratedPicto] = React.useState('');
  const { isPictoGenerationActive } = useGeneratePictoActive();

  useEffect(() => {
    const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    };

    async function getSrc() {
      if (image) {
        if (image.startsWith('http')) {
          setSrc(image);
          return;
        }
        const blob = b64toBlob(image, 'image/jpg');
        const url = URL.createObjectURL(blob);
        setSrc(url);
        return;
      }
      setSrc(null);
    }
    getSrc();
  }, [setSrc, image, label, tileId]);

  const generatePicto = useCallback(async () => {
    const description = label;
    if (!description) return;

    try {
      const generatedPicto = await createPicto(description);
      setGeneratedPicto(generatedPicto.url);
    } catch (e) {
      console.error('Error aca' + e);
    }
  }, [label]);

  useEffect(() => {
    if (image === '' && isPictoGenerationActive) {
      generatePicto();
    }
  }, [image, generatePicto, isPictoGenerationActive]);

  useUpdateTileImage(tileId, image, generatedPicto);
  // const onClick = () => {
  //   if (image === '' && label && !isPending) {
  //     console.log('Generating picto for', label);
  //     startTransition(async () => {
  //       const description = label;
  //       try {
  //         console.log('Creating picto for', description);
  //         const generatedPicto = await createPicto(description);
  //         console.log('Generated picto', generatedPicto);
  //         //setSrc(generatedPicto.url);
  //         updateTileImage(tileId, generatedPicto.url);
  //         setSrc(generatedPicto.url);
  //       } catch (e) {
  //         console.error('Error aca' + e.message);
  //       }
  //     });
  //   }
  // };

  const [selectedImageSuggestion, setSelectedImageSuggestion] =
    React.useState(0);

  const updateTileImage = useBoundStore((state) => state.updateTileImage);
  const handleNextImage = () => {
    if (!suggestedImages) return;
    let nextPosition = selectedImageSuggestion + 1;
    if (nextPosition > suggestedImages.length - 1) nextPosition = 0;

    updateTileImage(tileId, suggestedImages[nextPosition]);
    setSelectedImageSuggestion(nextPosition);
  };

  const handlePreviousImage = () => {
    if (!suggestedImages) return;
    let nextPosition = selectedImageSuggestion - 1;
    if (nextPosition < 0) nextPosition = suggestedImages.length - 1;

    updateTileImage(tileId, suggestedImages[nextPosition]);
    setSelectedImageSuggestion(nextPosition);
  };

  const suggestedImagesLength = suggestedImages?.length || 0;

  return (
    <div className={symbolClassName}>
      {/* <div onClick={onClick}>clickme</div> */}
      {labelpos === 'Above' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
      {!src && isPictoGenerationActive ? (
        <div className={style.SymbolLoadingContainer}>
          <CircularProgress
            sx={{
              justifySelf: 'center',
              alignSelf: 'space-around',
            }}
          />
        </div>
      ) : (
        src && (
          <Box sx={styles.symbolImageContainer}>
            {isEditingImage && (
              <Button onClick={handlePreviousImage} sx={styles.arrowButton}>
                <ArrowBack fontSize="large" />
              </Button>
            )}
            <div className={style.SymbolImageContainer}>
              <img className={style.SymbolImage} src={src} alt={label} />
              {/* TODO: Use Image component from next to optimize images - TechDebt */}
            </div>
            {isEditingImage && (
              <Button onClick={handleNextImage} sx={styles.arrowButton}>
                <ArrowForward fontSize="large" />
              </Button>
            )}
          </Box>
        )
      )}
      {isEditingImage && suggestedImagesLength && (
        <ImagePagination
          length={suggestedImagesLength}
          activeImage={selectedImageSuggestion}
        />
      )}
      {!src && !isPictoGenerationActive && (
        <div className={style.SymbolEmptyImageContainer}>
          <GenerateButton />
        </div>
      )}

      {labelpos === 'Below' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
    </div>
  );
}

const ImagePagination = ({
  length,
  activeImage,
}: {
  length: number;
  activeImage: number;
}) => {
  const pages = [];
  for (let i = 1; i <= length; i++) {
    if (i === activeImage + 1) {
      pages.push(<RadioButtonCheckedIcon fontSize="inherit" color="primary" />);
    } else {
      pages.push(
        <RadioButtonUncheckedIcon fontSize="inherit" color="primary" />,
      );
    }
  }
  return (
    <Box pb={1} sx={{ display: 'flex' }}>
      {pages}
    </Box>
  );
};
