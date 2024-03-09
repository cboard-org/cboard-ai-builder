import React from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';
import { LabelPositionRecord } from '../Tile/types';

type Props = {
  label: string | undefined;
  labelpos: LabelPositionRecord;
  image: string | undefined;
};

export default function Symbol({ label, labelpos, image }: Props) {
  const [src, setSrc] = React.useState('');
  const symbolClassName = style.Symbol;

  React.useEffect(() => {
    async function getSrc() {
      if (image) {
        if (image.startsWith('http')) {
          setSrc(image);
          return;
        }
        const blob = new Blob([image], { type: 'image/png' });
        setSrc(URL.createObjectURL(blob));
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
