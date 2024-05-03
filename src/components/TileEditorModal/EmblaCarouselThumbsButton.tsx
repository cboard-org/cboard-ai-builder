import Button from '@mui/material/Button';
import React from 'react';

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick } = props;

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
        <img
          className="embla__slide__img"
          src={`https://api.arasaac.org/api/pictograms/1024${index}`}
          alt="slide.label"
        />
      </Button>
    </div>
  );
};
