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
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <img
          className="embla__slide__img"
          src={`https://api.arasaac.org/api/pictograms/1024${index}`}
          alt="slide.label"
        />
      </button>
    </div>
  );
};
