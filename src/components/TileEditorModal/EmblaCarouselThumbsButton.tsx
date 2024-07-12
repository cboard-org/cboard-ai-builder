import Button from '@mui/material/Button';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AutoAwesome from '@mui/icons-material/AutoAwesome';

type PropType = {
  selected: boolean;
  src?: string;
  onClick: () => void;
  isChangingPicto?: boolean;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, src, isChangingPicto } = props;

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : '',
      )}
    >
      <Button
        sx={{
          border: 1,
          borderColor: selected ? '#7b1fa2' : 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
        variant={'text'}
        focusRipple
        onClick={onClick}
        type="button"
      >
        {src && (
          <img className="embla__slide__img" src={src} alt="img option" />
        )}
        {!src &&
          (isChangingPicto ? (
            <CircularProgress />
          ) : (
            <AutoAwesome fontSize="large" />
          ))}
      </Button>
    </div>
  );
};
