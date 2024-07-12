import React, { ReactNode, useEffect, useTransition } from 'react';
import style from './Tile.module.css';
import Symbol from '../Symbol';
import { TileRecord, LabelPositionRecord } from '@/commonTypes/Tile';
import Box from '@mui/material/Box';
import TileEditorModal from '@/components/TileEditorModal/TileEditorModal';
import { useState } from 'react';
import {
  changePicto,
  createPicto,
} from '@/app/[locale]/dashboard/[id]/@board/actions';
import Button from '@mui/material/Button';
import useUpdateTilePropsSaver from '@/hooks/useUpdateTilePropsSaver';

const useUpdatedTileSyncronizer = () => {
  const updateTilePropsSaver = useUpdateTilePropsSaver();
  const [updatedTile, setUpdatedTile] = useState<TileRecord | null>(null);
  const tileId = updatedTile?.id;

  useEffect(() => {
    if (updatedTile && tileId) {
      updateTilePropsSaver(tileId, updatedTile);
      setUpdatedTile(null);
    }
  }, [updatedTile, tileId, updateTilePropsSaver]);
  return setUpdatedTile;
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

  const [selectedImageSuggestion, setSelectedImageSuggestion] = useState(0);

  useEffect(() => {
    const selectedSuggestionIndex =
      tile.suggestedImages?.findIndex((element) => element === tile.image) || 0;
    setSelectedImageSuggestion(selectedSuggestionIndex);
  }, [tile.image, tile.suggestedImages]);

  const suggestedImages = tile.suggestedImages;
  const generatedPicto = tile.generatedPicto;

  const [isChangingPicto, setIsChangingPicto] = useState(false);
  const [, startTransition] = useTransition();

  const setUpdatedTile = useUpdatedTileSyncronizer();

  const updateTilePropsSaver = useUpdateTilePropsSaver();

  const addGeneratedPicto = (
    tile: TileRecord,
    generatedPicto: TileRecord['generatedPicto'],
    newPictoUrl: string,
  ) => {
    if (!generatedPicto) return;
    const slicedChangeImageIds = generatedPicto.changeImageIds?.slice(1);

    const concatedSuggestedImages = tile.suggestedImages
      ? tile.suggestedImages.concat(newPictoUrl)
      : [newPictoUrl];
    const updatedTile = {
      ...tile,
      image: newPictoUrl,
      suggestedImages: concatedSuggestedImages,
      generatedPicto: {
        ...generatedPicto,
        changeImageIds: slicedChangeImageIds,
      },
    };
    if (!updatedTile) throw new Error('Error adding generated picto');
    setUpdatedTile(updatedTile);
  };

  const handleNextImage = async () => {
    if (isChangingPicto) return;
    const unviewvedPictoGeneratedId =
      generatedPicto?.changeImageIds && generatedPicto?.changeImageIds[0];

    if (
      (suggestedImages && unviewvedPictoGeneratedId) ||
      !suggestedImages ||
      suggestedImages?.length === 0
    ) {
      if (!generatedPicto) {
        try {
          setIsChangingPicto(true);
          const generatedPicto = tile.label && (await createPicto(tile.label));
          if (generatedPicto) {
            addGeneratedPicto(tile, generatedPicto, generatedPicto.url);
            //updateTileImageSaver(tile.id, generatedPicto.url, generatedPicto);
            setSelectedImageSuggestion(0);
          }
        } catch (error) {
          console.error('Error generating picto', error);
        }
        setIsChangingPicto(false);
        return;
      }

      if (generatedPicto?.id && unviewvedPictoGeneratedId) {
        try {
          setIsChangingPicto(true);
          const generatedSuggestion = await changePicto(
            generatedPicto.id,
            unviewvedPictoGeneratedId,
          );
          if (!generatedSuggestion) {
            throw new Error('Error changing generated picto');
          }
          addGeneratedPicto(tile, generatedPicto, generatedSuggestion.url);
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
    const nextPositionIsLast =
      selectedImageSuggestion + 1 >= suggestedImages.length;
    const nextPosition = nextPositionIsLast ? 0 : selectedImageSuggestion + 1;
    updateTilePropsSaver(tile.id, {
      ...tile,
      image: suggestedImages[nextPosition],
    });
  };

  const onTileClick = () => {
    //setIsEditing(true);
    !isEditionView ? handleNextImage() : setIsEditing(true);
    handleTileClick(tile.id);
  };

  const unviewvedPictoGenerated = generatedPicto?.changeImageIds?.length;
  const suggestedImagesLength =
    (suggestedImages?.length || 0) + (unviewvedPictoGenerated || 0);

  return (
    <>
      <Button
        disabled={
          suggestedImagesLength === 1 &&
          unviewvedPictoGenerated === 0 &&
          !isEditionView
        }
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
            tile={tile}
            addGeneratedPicto={addGeneratedPicto}
            labelpos={displaySettings.labelPosition}
            suggestedImagesLength={suggestedImagesLength}
            selectedImageSuggestion={selectedImageSuggestion}
            isChangingPicto={isChangingPicto}
          />
        </Box>
        {children}
      </Button>
      {isEditing && (
        <TileEditorModal
          tile={tile}
          onClose={() => setIsEditing(false)}
          onNextGeneratedPictoClick={handleNextImage}
        />
      )}
    </>
  );
}
