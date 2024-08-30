import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';
import './css/base.css';
import './css/embla.css';
import TilePreview from './TilePreview/TilePreview';
import PictogramEditor from '../PictogramEditor/PictogramEditor';
import Box from '@mui/material/Box';
import styles from './styles';
import TextField from '@mui/material/TextField';
import { TileRecord } from '@/commonTypes/Tile';
import ConfirmButtons from './TileEditorDialogActions';
import DialogContent from '@mui/material/DialogContent';
import Image from 'next/image';
import useUpdateTilePropsSaver from '@/hooks/useUpdateTilePropsSaver';
import usePrimarySuggestedImagesMerger from './hooks/usePrimarySuggestedImagesMerger';
import CircularProgress from '@mui/material/CircularProgress';
import { getErrorMessage } from '@/common/common';

type PropType = {
  primaryTile: TileRecord;
  onClose: () => void;
  onNextGeneratedPictoClick: () => Promise<void>;
  isChangingPicto: boolean;
  generatePicto: (label: string) => Promise<void>;
  pictogramIndexBeforeSave: number | null;
};

const OPTIONS: EmblaOptionsType = { loop: true };

const TileEditor: React.FC<PropType> = ({
  primaryTile,
  onClose,
  onNextGeneratedPictoClick,
  isChangingPicto,
  generatePicto,
  pictogramIndexBeforeSave,
}) => {
  const [tile, setTile] = useState(primaryTile);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTile((prevTile) => ({ ...prevTile, label: e.target.value }));
  };

  const areUnviewedPictoGenerations = primaryTile.generatedPicto?.changeImageIds
    ?.length
    ? primaryTile.generatedPicto?.changeImageIds?.length >= 1
    : false;

  const slides = useMemo(() => {
    const suggestedImages = tile.suggestedImages ?? null;
    if (suggestedImages === null) return [];
    return [...suggestedImages, ''];
  }, [tile.suggestedImages]);

  const [selectedIndex, setSelectedIndex] = useState(pictogramIndexBeforeSave);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      setSelectedIndex(index);
      emblaMainApi.scrollTo(index);
      emblaThumbsApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setTile((prev) => ({
      ...prev,
      image: slides[emblaMainApi.selectedScrollSnap()],
    }));
    if (selectedIndex) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex, slides, selectedIndex]);

  const [mustForceIndex, setMustForceIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!mustForceIndex) return;
    setSelectedIndex(mustForceIndex);
    setMustForceIndex(null);
  }, [mustForceIndex]);

  useEffect(() => {
    if (!selectedIndex || !emblaMainApi || !emblaThumbsApi) return;
    emblaMainApi.scrollTo(selectedIndex);
    emblaThumbsApi.scrollTo(selectedIndex);
    onSelect();
  }, [selectedIndex, onThumbClick, emblaMainApi, emblaThumbsApi, onSelect]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on('select', onSelect);
    const cleanup = () => {
      emblaMainApi.off('select', onSelect);
    };
    return cleanup;
  }, [emblaMainApi, onSelect, emblaThumbsApi, onThumbClick]);

  const handleNextCarrouselImage = () => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollNext();
    onThumbClick(emblaMainApi.selectedScrollSnap());
    if (slides.length === emblaMainApi.selectedScrollSnap() + 1) {
      if (areUnviewedPictoGenerations) return handleOnNextGeneratedPictoClick();
      handleNextCarrouselImage();
    }
  };

  const TileGalery = (
    <div className="embla" style={{ backgroundColor: tile.backgroundColor }}>
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((src, index) => (
            <div className="embla__slide embla__class-names" key={index}>
              <div className="embla__tile" onClick={handleNextCarrouselImage}>
                {src ? (
                  <Image
                    className="embla__slide__img"
                    src={src}
                    alt="slide.label"
                    width={300}
                    height={300}
                  />
                ) : (
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'100%'}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </div>
            </div>
          ))}
          {slides.length === 0 && <EmptyTile />}
        </div>
      </div>
    </div>
  );

  const handleOnNextGeneratedPictoClick = async () => {
    try {
      await onNextGeneratedPictoClick();
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const ThumbsCarrousel = (
    <div className="embla-thumbs">
      <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
        <div className="embla-thumbs__container">
          {slides.map((src, index) => (
            <Thumb
              key={index}
              onClick={
                src
                  ? () => onThumbClick(index)
                  : () => {
                      onThumbClick(index);
                      handleOnNextGeneratedPictoClick();
                    }
              }
              selected={index === selectedIndex}
              src={src}
              isChangingPicto={isChangingPicto}
              disabled={!src && !areUnviewedPictoGenerations}
              tileColor={tile.backgroundColor}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const emblaCarrouselTheme = 'theme-light';

  const updateTilePropsSaver = useUpdateTilePropsSaver();

  const handleSave = async () => {
    updateTilePropsSaver(tile.id, tile);
    onClose();
  };

  const [isSearching, setIsSearching] = useState(false);
  const handleSearchToogleClick = () => {
    setIsSearching((prev) => !prev);
  };

  const handleChangePictogram = (src: string) => {
    setTile((prevTile) => {
      const newsuggestedImages = prevTile.suggestedImages
        ? [...prevTile.suggestedImages, src]
        : [src];
      setMustForceIndex(newsuggestedImages.length - 1);
      return {
        ...prevTile,
        suggestedImages: newsuggestedImages,
        image: src,
      };
    });
  };

  usePrimarySuggestedImagesMerger(primaryTile, setTile);

  const handleOnGeneratePictoInit = async (label: string) => {
    if (areUnviewedPictoGenerations) {
      await handleOnNextGeneratedPictoClick();
      return;
    }
    const lastIndex = slides.length;
    setMustForceIndex(lastIndex - 1);
    await generatePicto(label);
  };

  const showCarrousel = slides.length > 0 || isChangingPicto;

  return (
    <>
      {!isSearching && (
        <ConfirmButtons handleClose={onClose} handleSave={handleSave} />
      )}
      <DialogContent>
        <Box
          maxHeight={isSearching ? '100%' : 'auto'}
          style={styles.sectionsContainer}
          className={emblaCarrouselTheme}
        >
          {!isSearching && (
            <TilePreview TileGalery={TileGalery} label={tile.label} />
          )}
          <PictogramEditor
            onSearchToogleClick={handleSearchToogleClick}
            onGeneratePictoInit={handleOnGeneratePictoInit}
            carrousel={showCarrousel ? ThumbsCarrousel : null}
            isSearching={isSearching}
            onChangePictogram={handleChangePictogram}
            showGenerationButton={
              !areUnviewedPictoGenerations && !isChangingPicto
            }
            tileLabel={tile.label ?? ''}
          />
          {!isSearching && (
            <TextField
              required
              id="Label textfield"
              label="Label"
              defaultValue={tile.label}
              onChange={handleLabelChange}
            />
          )}
        </Box>
      </DialogContent>
    </>
  );
};

const EmptyTile = () => (
  <div className="embla__slide embla__class-names">
    <div className="embla__tile">
      <div className="embla__slide__empty-image"></div>
    </div>
  </div>
);
export default TileEditor;
