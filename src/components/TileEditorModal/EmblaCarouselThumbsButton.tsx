import Button from '@mui/material/Button';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AutoAwesome from '@mui/icons-material/AutoAwesome';

type PropType = {
  selected: boolean;
  src?: string;
  onClick: () => void;
  isChangingPicto?: boolean;
  disabled?: boolean;
  tileColor?: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, src, isChangingPicto, disabled, tileColor } =
    props;

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : '',
      )}
    >
      <Button
        sx={{
          border: selected ? 4 : 1,
          borderColor: selected
            ? (theme) => theme.palette.primary.main
            : 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: src && tileColor ? tileColor : 'transparent',
          '&:focus': {
            backgroundColor: src && tileColor ? tileColor : 'transparent',
          },
        }}
        variant={'text'}
        focusRipple
        onClick={onClick}
        disabled={disabled}
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
