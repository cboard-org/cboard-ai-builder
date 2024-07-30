import React, { useCallback, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';
import { LabelPositionRecord, TileRecord } from '@/commonTypes/Tile';
import { createPicto } from '@/app/[locale]/dashboard/[id]/@board/actions';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import CircularProgress from '@mui/material/CircularProgress';
import { usePathname } from '@/navigation';
import { STASHED_CONTENT_ID } from '@/app/[locale]/dashboard/[id]/constants';
import GenerateIcon from './GenerateIcon';
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

type AddGeneratedPicto = (
  tile: TileRecord,
  generatedPicto: TileRecord['generatedPicto'],
  newPictoUrl: string,
) => void;

type Props = {
  tile: TileRecord;
  addGeneratedPicto: AddGeneratedPicto;
  labelpos: LabelPositionRecord;
  suggestedImagesLength: number;
  selectedImageSuggestion: number;
  isChangingPicto: boolean;
};
const useUpdateTileImage = (
  tile: TileRecord,
  generatedPicto: TileRecord['generatedPicto'],
  addGeneratedPicto: AddGeneratedPicto,
) => {
  const image = tile.image;
  const [stashDashboard] = useBoundStore(
    useShallow((state) => [state.stashDashboard]),
  );
  const { isStashedContentView, isPictoGenerationActive } =
    useGeneratePictoActive();

  useEffect(() => {
    if (image === '' && isPictoGenerationActive && generatedPicto) {
      addGeneratedPicto(tile, generatedPicto, generatedPicto.url);
      if (isStashedContentView) stashDashboard();
    }
  }, [
    addGeneratedPicto,
    image,
    generatedPicto,
    tile,
    stashDashboard,
    isStashedContentView,
    isPictoGenerationActive,
  ]);
};

export const useGeneratePictoActive = () => {
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
  tile,
  addGeneratedPicto,
  labelpos,
  suggestedImagesLength,
  selectedImageSuggestion,
  isChangingPicto,
}: Props) {
  const { label, image, id: tileId } = tile;
  const [src, setSrc] = React.useState<string | null>(null);
  const symbolClassName = style.Symbol;
  const [generatedPicto, setGeneratedPicto] =
    React.useState<TileRecord['generatedPicto']>(undefined);
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
      setGeneratedPicto(generatedPicto);
    } catch (e) {
      console.error('Error aca' + e);
    }
  }, [label]);

  useEffect(() => {
    if (image === '' && isPictoGenerationActive) {
      generatePicto();
    }
  }, [image, generatePicto, isPictoGenerationActive]);

  useUpdateTileImage(tile, generatedPicto, addGeneratedPicto);
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

  return (
    <div className={symbolClassName}>
      {/* <div onClick={onClick}>clickme</div> */}
      {labelpos === 'Above' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
      {(!src && isPictoGenerationActive) || isChangingPicto ? (
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <div className={style.SymbolImageContainer}>
              <img className={style.SymbolImage} src={src} alt={label} />
              {/* TODO: Use Image component from next to optimize images - TechDebt */}
            </div>
            <ImagePagination
              length={suggestedImagesLength}
              activeImage={selectedImageSuggestion}
            />
          </Box>
        )
      )}

      {!src && !isPictoGenerationActive && !isChangingPicto && (
        <div className={style.SymbolEmptyImageContainer}>
          <GenerateIcon />
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
      pages.push(
        <CircleIcon
          sx={{ fontSize: 10 }}
          fontSize="inherit"
          color="primary"
          key={i}
        />,
      );
    } else {
      pages.push(
        <RadioButtonUncheckedIcon
          sx={{ fontSize: 10 }}
          // fontSize="inherit"
          color="primary"
          key={i}
        />,
      );
    }
  }
  return (
    <Box pb={1} sx={{ display: 'flex' }}>
      {pages}
    </Box>
  );
};
