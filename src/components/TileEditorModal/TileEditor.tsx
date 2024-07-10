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
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useIsStashedContentView from '@/app/[locale]/dashboard/[id]/hooks/useIsStashedView';
import DialogContent from '@mui/material/DialogContent';
import useIsRemoteContentView from '@/app/[locale]/dashboard/[id]/hooks/useIsRemoteContentView';
import Image from 'next/image';

type PropType = {
  initialTile: TileRecord;
  onClose: () => void;
};

const OPTIONS: EmblaOptionsType = { loop: true };

const TileEditor: React.FC<PropType> = ({ initialTile, onClose }) => {
  const [tile, setTile] = useState(initialTile);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTile((prevTile) => ({ ...prevTile, label: e.target.value }));
  };
  const slides = useMemo(() => {
    return tile.suggestedImages ?? [];
  }, [tile.suggestedImages]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS);
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
    setTile((prev) => ({
      ...prev,
      image: slides[emblaMainApi.selectedScrollSnap()],
    }));
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex, setTile, slides]);

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

  const TileGalery = (
    <div className="embla" style={{ backgroundColor: tile.backgroundColor }}>
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((src, index) => (
            <div className="embla__slide embla__class-names" key={index}>
              <div className="embla__tile" onClick={handleNextImage}>
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
        </div>
      </div>
    </div>
  );

  const emblaCarrouselTheme = 'theme-light';

  const isStashedContentView = useIsStashedContentView();
  const isRemoteContentView = useIsRemoteContentView();

  const useUpdateTilePropsSaver = () => {
    const [updateTileProps, stashDashboard, board] = useBoundStore(
      useShallow((state) => [
        state.updateTileProps,
        state.stashDashboard,
        state.board,
      ]),
    );
    // const { isStashedContentView } = useGeneratePictoActive();
    const updateTilePropsSaver = async (
      tileId: string,
      tileProps: TileRecord,
    ) => {
      updateTileProps(tileId, tileProps, isRemoteContentView ? board : null);
      if (isStashedContentView) stashDashboard();
    };
    return updateTilePropsSaver;
  };
  const updateTilePropsSaver = useUpdateTilePropsSaver();

  const handleSave = async () => {
    await updateTilePropsSaver(tile.id, tile);
    onClose();
  };

  const [isSearching, setIsSearching] = useState(false);
  const handleSearchToogleClick = () => {
    setIsSearching((prev) => !prev);
  };

  const handleChangePictogram = (src: string) => {
    setTile((prevTile) => {
      const newsuggestedImages = prevTile.suggestedImages
        ? [src, ...prevTile.suggestedImages]
        : [src];
      return {
        ...prevTile,
        suggestedImages: newsuggestedImages ?? [src],
        image: src,
      };
    });
  };

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
            carrousel={slides.length > 0 ? ThumbsCarrousel : null}
            isSearching={isSearching}
            onChangePictogram={handleChangePictogram}
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
