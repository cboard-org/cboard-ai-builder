import React from 'react';
import Typography from '@mui/material/Typography';
import style from './Symbol.module.css';

type Props = {
  label: string | undefined;
  labelpos: string | undefined;
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
        </div>
      )}
      {labelpos === 'Below' && (
        <Typography className={style.SymbolLabel}>{label}</Typography>
      )}
    </div>
  );
}
