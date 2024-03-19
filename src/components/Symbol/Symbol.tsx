import React from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';
import { LabelPositionRecord } from '@/commonTypes/Tile';

type Props = {
  label: string | undefined;
  labelpos: LabelPositionRecord;
  image: string | undefined;
};

export default function Symbol({ label, labelpos, image }: Props) {
  const [src, setSrc] = React.useState('');
  const symbolClassName = style.Symbol;

  React.useEffect(() => {
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
      }
    }
    getSrc();
  }, [setSrc, image]);

  return (
    <div className={symbolClassName}>
      {labelpos === 'Above' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
      {src && (
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
