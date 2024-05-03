import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';
import './css/base.css';
import './css/embla.css';
import Typography from '@mui/material/Typography';
import PictogramEditor from '../PictogramEditor/PictogramEditor';
import Box from '@mui/material/Box';
import styles from './styles';
import TextField from '@mui/material/TextField';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  tileColor: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  const handleNextImage = () => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollNext();
  };

  const ThumbsCarrousel = (
    <div className="embla-thumbs">
      <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
        <div className="embla-thumbs__container">
          {slides.map((index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const emblaCarrouselTheme = 'theme-light';

  return (
    <Box style={styles.sectionsContainer} className={emblaCarrouselTheme}>
      <Box sx={styles.tileContainer}>
        <div className="embla" style={{ backgroundColor: props.tileColor }}>
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {slides.map((index) => (
                <div className="embla__slide embla__class-names" key={index}>
                  <div className="embla__tile" onClick={handleNextImage}>
                    <img
                      className="embla__slide__img"
                      src={`https://api.arasaac.org/api/pictograms/1024${index}`}
                      alt="slide.label"
                    />
                  </div>
                </div>
              ))}
              {slides.length === 0 && <EmptyTile />}
            </div>
          </div>
        </div>
        <div className="embla-tile__label-container">
          <Typography
            variant="body1"
            fontWeight={700}
            className="embla-tile__label"
          >
            LABEL
          </Typography>
        </div>
      </Box>
      <PictogramEditor carrousel={ThumbsCarrousel} />
      <TextField
        required
        id="Label textfield"
        label="Tile Label"
        defaultValue="Label"
      />
    </Box>
  );
};

const EmptyTile = () => (
  <div className="embla__slide embla__class-names">
    <div className="embla__tile">
      <div className="embla__slide__empty-image"></div>
    </div>
  </div>
);
export default EmblaCarousel;
