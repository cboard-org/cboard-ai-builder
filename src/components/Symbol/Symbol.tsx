import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';
import { LabelPositionRecord, TileRecord } from '@/commonTypes/Tile';
import CircularProgress from '@mui/material/CircularProgress';
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

export default function Symbol({
  tile,
  labelpos,
  suggestedImagesLength,
  selectedImageSuggestion,
  isChangingPicto,
}: Props) {
  const { label, image, id: tileId } = tile;
  const [src, setSrc] = React.useState<string | null>(null);
  const symbolClassName = style.Symbol;

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

  return (
    <div className={symbolClassName}>
      {/* <div onClick={onClick}>clickme</div> */}
      {labelpos === 'Above' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
      {isChangingPicto ? (
        <div className={style.SymbolLoadingContainer}>
          <CircularProgress
            color="secondary"
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

      {!src && !isChangingPicto && (
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
          color="secondary"
          key={i}
        />,
      );
    } else {
      pages.push(
        <RadioButtonUncheckedIcon
          sx={{ fontSize: 10 }}
          // fontSize="inherit"
          color="secondary"
          key={i}
        />,
      );
    }
  }
  return (
    <Box pb={1} sx={{ display: 'flex' }} className={'hide-on-print'}>
      {pages}
    </Box>
  );
};
