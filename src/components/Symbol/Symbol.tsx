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
  const src = image;
  const symbolClassName = style.Symbol;

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