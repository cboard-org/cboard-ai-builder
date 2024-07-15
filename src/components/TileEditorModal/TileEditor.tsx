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
import useLastIndexSelector from './hooks/useLastIndexSelector';

type PropType = {
  initialTile: TileRecord;
  onClose: () => void;
  onNextGeneratedPictoClick: () => Promise<void>;
  isChangingPicto: boolean;
};

const OPTIONS: EmblaOptionsType = { loop: true };

const TileEditor: React.FC<PropType> = ({
  initialTile,
  onClose,
  onNextGeneratedPictoClick,
  isChangingPicto,
}) => {
  const [tile, setTile] = useState(initialTile);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTile((prevTile) => ({ ...prevTile, label: e.target.value }));
  };
  const slides = useMemo(() => {
    return tile.suggestedImages ?? [];
  }, [tile.suggestedImages]);

  const initialIndex =
    tile.suggestedImages?.findIndex(
      (suggestion) => suggestion === initialTile.image,
    ) || 0;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
      emblaThumbsApi?.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    setTile((prev) => ({
      ...prev,
      image: slides[emblaMainApi.selectedScrollSnap()],
    }));
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex, setTile, slides]);

  const { setMustForceSelectedIndex } = useLastIndexSelector({
    tile,
    setTile,
    primaryTile: initialTile,
    slides,
    onThumbClick,
    setSelectedIndex,
  });

  useEffect(() => {
    if (!emblaMainApi) return;
    onThumbClick(initialIndex);
    setSelectedIndex(initialIndex);
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect, initialIndex, emblaThumbsApi, onThumbClick]);

  const handleNextCarrouselImage = () => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollNext();
  };

  const TileGalery = (
    <div className="embla" style={{ backgroundColor: tile.backgroundColor }}>
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((src, index) => (
            <div className="embla__slide embla__class-names" key={index}>
              <div className="embla__tile" onClick={handleNextCarrouselImage}>
                <Image
                  className="embla__slide__img"
                  src={src}
                  alt="slide.label"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          ))}
          {slides.length === 0 && <EmptyTile />}
        </div>
      </div>
    </div>
  );

  const areUnviewedPictoGenerations = initialTile.generatedPicto?.changeImageIds
    ?.length
    ? initialTile.generatedPicto?.changeImageIds?.length >= 1
    : false;

  const ThumbsCarrousel = (
    <div className="embla-thumbs">
      <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
        <div className="embla-thumbs__container">
          {slides.map((src, index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              src={src}
            />
          ))}
          {areUnviewedPictoGenerations || isChangingPicto ? (
            <Thumb
              onClick={async () => {
                await onNextGeneratedPictoClick();
                setMustForceSelectedIndex(true);
              }}
              selected={false}
              isChangingPicto={isChangingPicto}
            />
          ) : null}
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

      return {
        ...prevTile,
        suggestedImages: newsuggestedImages ?? [src],
        image: src,
      };
    });
  };

  const primaryTile = initialTile;
  usePrimarySuggestedImagesMerger(primaryTile, setTile);

  const handleOnGeneratedPictoClick = async () => {
    if (areUnviewedPictoGenerations) {
      await onNextGeneratedPictoClick();
    }
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
            onGeneratedPictoClick={handleOnGeneratedPictoClick}
            carrousel={showCarrousel ? ThumbsCarrousel : null}
            isSearching={isSearching}
            onChangePictogram={handleChangePictogram}
            showGenerationButton={
              !areUnviewedPictoGenerations && !isChangingPicto
            }
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
