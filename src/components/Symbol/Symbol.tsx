import React, { useCallback, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';
import { LabelPositionRecord } from '@/commonTypes/Tile';
import { createPicto } from '@/app/[locale]/dashboard/[id]/@board/actions';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  label: string | undefined;
  labelpos: LabelPositionRecord;
  image: string | undefined;
  tileId: string;
};

const useUpdateTileImage = (
  tileId: string,
  image: string = '',
  generatedPicto: string,
) => {
  const updateTileImage = useBoundStore((state) => state.updateTileImage);
  useEffect(() => {
    if (image === '') {
      updateTileImage(tileId, generatedPicto);
    }
  }, [updateTileImage, image, generatedPicto, tileId]);
};

export default function Symbol({ label, labelpos, image, tileId }: Props) {
  const [src, setSrc] = React.useState('');
  const [updateTileImage, stashDashboard] = useBoundStore(
    useShallow((state) => [state.updateTileImage, state.stashDashboard]),
  );
  const symbolClassName = style.Symbol;
  const [generatedPicto, setGeneratedPicto] = React.useState('');

  React.useEffect(() => {
    let ignore = false;
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
        } else {
          const blob = b64toBlob(image, 'image/jpg');
          const url = URL.createObjectURL(blob);
          setSrc(url);
        }
      }
    }
    getSrc();

    return () => {
      ignore = true;
      console.log('cleanup', ignore);
    };
  }, [setSrc, image, label, tileId, updateTileImage, stashDashboard]);

  const generatePicto = useCallback(async () => {
    const description = label;
    if (!description) return;

    try {
      console.log('Creating picto for', description, 'ignore');

      const generatedPicto = await createPicto(description);
      setGeneratedPicto(generatedPicto.url);

      console.log('Generated picto', generatedPicto, 'ignore');

      //updateTileImage(tileId, generatedPicto.url);
      //stashDashboard();
      //setSrc(generatedPicto.url);
    } catch (e) {
      console.error('Error aca' + e);
    }
  }, [label]);

  useEffect(() => {
    if (image === '') {
      generatePicto();
    }
  }, [image, generatePicto]);

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

  return (
    <div className={symbolClassName}>
      {/* <div onClick={onClick}>clickme</div> */}
      {labelpos === 'Above' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}

      <div className={style.SymbolImageContainer}>
        {!image ? (
          <CircularProgress
            sx={{
              justifyContent: 'center',
              alignContent: 'space-around',
            }}
          />
        ) : (
          <img className={style.SymbolImage} src={src} alt={label} />
        )}
      </div>
      {labelpos === 'Below' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
    </div>
  );
}
