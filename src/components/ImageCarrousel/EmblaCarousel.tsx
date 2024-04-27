import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';
import './css/base.css';
import './css/embla.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import ReplayIcon from '@mui/icons-material/Replay';
// import CircularProgress from '@mui/material/CircularProgress';
// import GenerateButton from '../Symbol/GenerateButton';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

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

  const generatePictoKey = slides.length;
  const slidesAndGeneratePicto = useMemo(() => {
    return [...slides, generatePictoKey];
  }, [generatePictoKey, slides]);
  console.log('generatePictoKey', generatePictoKey);
  const isGenerateSelected = generatePictoKey === selectedIndex;

  return (
    <div className="tile__container theme-light">
      <div className="embla" style={{ backgroundColor: props.tileColor }}>
        <div className="embla__viewport" ref={emblaMainRef}>
          <div className="embla__container">
            {slidesAndGeneratePicto.map((index) => (
              <div className="embla__slide embla__class-names" key={index}>
                <div className="embla__tile" onClick={handleNextImage}>
                  {index !== generatePictoKey ? (
                    <img
                      className="embla__slide__img"
                      src={`https://api.arasaac.org/api/pictograms/1024${index}`}
                      alt="slide.label"
                    />
                  ) : (
                    <div className="embla__slide__empty-image"></div>
                  )}
                </div>
              </div>
            ))}
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
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slidesAndGeneratePicto.map((index) =>
              index !== generatePictoKey ? (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                />
              ) : (
                <Box
                  key={generatePictoKey}
                  className="embla-thumbs__slide"
                  sx={{
                    // flex: '0 0 fit-content',
                    minHeight: '48px',
                  }}
                >
                  <Fade in={true}>
                    {
                      <Button
                        sx={{
                          display: 'flex',
                          alignItems: 'space-between',
                          width: '100%',
                          // justifyContent: 'space-around',
                          justifyContent: 'center',
                          height: '100%',
                        }}
                        onClick={() => onThumbClick(generatePictoKey)}
                        className="embla-thumbs__slide__number"
                        variant={isGenerateSelected ? 'contained' : 'outlined'}
                        // startIcon={<AutoAwesomeIcon />}
                      >
                        <AutoAwesomeIcon />
                      </Button>
                    }
                  </Fade>
                </Box>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
