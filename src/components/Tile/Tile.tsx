import React, { ReactNode, useTransition } from 'react';
import style from './Tile.module.css';
import Symbol from '../Symbol';
import { TileRecord, LabelPositionRecord } from '@/commonTypes/Tile';
import Box from '@mui/material/Box';
import TileEditor from '@/components/TileEditor/TileEditor';
import { useState } from 'react';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { useGeneratePictoActive } from '@/components/Symbol/Symbol';
import { changePicto } from '@/app/[locale]/dashboard/[id]/@board/actions';
import Button from '@mui/material/Button';

const useUpdateTileImageSaver = () => {
  const [updateTileImage, stashDashboard] = useBoundStore(
    useShallow((state) => [state.updateTileImage, state.stashDashboard]),
  );
  const { isStashedContentView } = useGeneratePictoActive();
  const updateTileImageSaver = (
    tileId: string,
    imageUrl: string,
    generatedPicto?: TileRecord['generatedPicto'],
  ) => {
    if (generatedPicto) updateTileImage(tileId, imageUrl, generatedPicto);
    updateTileImage(tileId, imageUrl);
    if (isStashedContentView) stashDashboard();
  };
  return updateTileImageSaver;
};

type Props = {
  children?: ReactNode;
  tile: TileRecord;
  handleTileClick: (id: string) => void;
  isEditionView?: boolean;
};

export default function Tile({
  tile,
  handleTileClick,
  children,
  isEditionView,
}: Props) {
  const displaySettings = {
    labelPosition: 'Below',
  } as { labelPosition: LabelPositionRecord }; // TODO: get from settings
  const [isEditing, setIsEditing] = React.useState(false);
  const isFolder = Boolean(tile.loadBoard);

  const tileShapeStyles = { borderColor: '', backgroundColor: '' };

  if (tile.borderColor) {
    tileShapeStyles.borderColor = tile.borderColor;
  }

  if (tile.backgroundColor) {
    tileShapeStyles.backgroundColor = tile.backgroundColor;
  }

  const defaultSelectedImageSuggestion =
    (tile.image &&
      tile.generatedPicto?.upscaledPictos?.findIndex(
        (element) => element === tile.image,
      )) ||
    tile.suggestedImages?.findIndex((element) => element === tile.image) ||
    0;

  const [selectedImageSuggestion, setSelectedImageSuggestion] = useState(
    defaultSelectedImageSuggestion,
  );

  const updateTileImageSaver = useUpdateTileImageSaver();

  const suggestedImages = tile.suggestedImages;
  const generatedPicto = tile.generatedPicto;

  const [isChangingPicto, setIsChangingPicto] = useState(false);
  const [, startTransition] = useTransition();

  const handleNextImage = async () => {
    let nextPosition = selectedImageSuggestion + 1;
    const upscaledPictos = tile.generatedPicto?.upscaledPictos || [];
    if (!suggestedImages || suggestedImages?.length === 0) {
      if (nextPosition >= 4) nextPosition = 0;
      if (upscaledPictos[nextPosition] !== undefined) {
        updateTileImageSaver(tile.id, upscaledPictos[nextPosition]);
        setSelectedImageSuggestion(nextPosition);
        return;
      }
      if (
        generatedPicto?.id &&
        generatedPicto?.changeImageIds &&
        generatedPicto?.changeImageIds[nextPosition]
      ) {
        try {
          setIsChangingPicto(true);
          const generatedSuggestion = await changePicto(
            generatedPicto.id,
            generatedPicto.changeImageIds[nextPosition],
          );
          const upscaledPictos = generatedPicto.upscaledPictos || [
            generatedPicto.url,
          ];
          updateTileImageSaver(tile.id, generatedSuggestion.url, {
            ...generatedPicto,
            upscaledPictos: [...upscaledPictos, generatedSuggestion.url],
          });
          setSelectedImageSuggestion(nextPosition);
        } catch (error) {
          console.error('Error changing generated picto', error);
        }
        startTransition(() => {
          setIsChangingPicto(false);
        });
      }
      return;
    }
    if (suggestedImages.length === 1) return;

    if (nextPosition > suggestedImages.length - 1) nextPosition = 0;

    updateTileImageSaver(tile.id, suggestedImages[nextPosition]);
    setSelectedImageSuggestion(nextPosition);
  };

  const onTileClick = () => {
    //setIsEditing(true);
    !isEditionView && handleNextImage();
    handleTileClick(tile.id);
  };

  const suggestedImagesLength =
    suggestedImages?.length || generatedPicto?.changeImageIds?.length || 0;

  return (
    <TileEditor
      isEditing={isEditing}
      onClose={() => {
        setIsEditing(false);
      }}
      tile={tile}
    >
      <Button
        disabled={suggestedImagesLength <= 1 && !isEditionView}
        className={style.Tile}
        type="button"
        onClick={onTileClick}
      >
        <div
          className={style.TileShape}
          style={tileShapeStyles}
          data-isfolder={isFolder}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Symbol
            image={tile.image}
            label={tile.label}
            labelpos={displaySettings.labelPosition}
            tileId={tile.id}
            suggestedImagesLength={
              suggestedImages?.length ||
              generatedPicto?.changeImageIds?.length ||
              0
            }
            selectedImageSuggestion={selectedImageSuggestion}
            isChangingPicto={isChangingPicto}
          />
        </Box>
        {children}
      </Button>
    </TileEditor>
  );
}
