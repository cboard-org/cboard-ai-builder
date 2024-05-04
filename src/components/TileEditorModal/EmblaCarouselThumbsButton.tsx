import Button from '@mui/material/Button';
import React from 'react';

type PropType = {
  selected: boolean;
  src: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, src } = props;

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : '',
      )}
    >
      <Button
        sx={{ border: 1, borderColor: selected ? '#7b1fa2' : 'transparent' }}
        variant={'text'}
        focusRipple
        onClick={onClick}
        type="button"
      >
        <img className="embla__slide__img" src={src} alt="img option" />
      </Button>
    </div>
  );
};
