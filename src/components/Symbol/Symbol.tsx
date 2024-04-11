import React, { useCallback, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';
import { LabelPositionRecord } from '@/commonTypes/Tile';
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
  const [updateTileImage, stashDashboard] = useBoundStore(
    useShallow((state) => [state.updateTileImage, state.stashDashboard]),
  );
  useEffect(() => {
    if (image === '') {
      updateTileImage(tileId, generatedPicto);
      stashDashboard();
    }
  }, [updateTileImage, image, generatedPicto, tileId, stashDashboard]);
};

export default function Symbol({ label, labelpos, image, tileId }: Props) {
  const [src, setSrc] = React.useState<string | null>(null);
  const symbolClassName = style.Symbol;
  const [generatedPicto, setGeneratedPicto] = React.useState('');

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

  const controlerRef = useRef(new AbortController());

  const generatePicto = useCallback(async () => {
    const description = label;
    if (!description) return;

    try {
      const res = await fetch('/api/create-picto', {
        method: 'POST',
        signal: controlerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key':
            '74cc79460fmsh3c6d0abcb93703cp140eb4jsn8975796733b1',
          'X-RapidAPI-Host': 'textapis.p.rapidapi.com',
        },
        body: JSON.stringify({
          description: description,
        }),
      });
      const generatedPicto = await res.json();
      console.log('res picto', res);
      console.log('Generated picto', generatedPicto);
      setGeneratedPicto(generatedPicto.url);
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
      {!src ? (
        <div className={style.SymbolLoadingContainer}>
          <CircularProgress
            sx={{
              justifySelf: 'center',
              alignSelf: 'space-around',
            }}
          />
        </div>
      ) : (
        <div className={style.SymbolImageContainer}>
          <img className={style.SymbolImage} src={src} alt={label} />
          {/* TODO: Use Image component from next to optimize images - TechDebt */}
        </div>
      )}
      {labelpos === 'Below' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
    </div>
  );
}
