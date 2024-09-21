import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useTransition,
} from 'react';
import style from './Tile.module.css';
import Symbol from '../Symbol';
import { TileRecord, LabelPositionRecord } from '@/commonTypes/Tile';
import Box from '@mui/material/Box';
import TileEditorModal from '@/components/TileEditorModal/TileEditorModal';
import { useState } from 'react';
import { createAIPicto, changePicto } from '@/lib/ai-picto/picto';
import Button from '@mui/material/Button';
import useUpdateTilePropsSaver from '@/hooks/useUpdateTilePropsSaver';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { usePathname } from '@/navigation';
import { STASHED_CONTENT_ID } from '@/app/[locale]/(dashboard)/constants';
import { getErrorMessage } from '@/common/common';

const useUpdatedTileSynchronizer = () => {
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

const useGeneratePictoActive = () => {
  const [prompt] = useBoundStore(useShallow((state) => [state.prompt]));
  const pathname = usePathname();
  const isStashedContentView = pathname.includes(
    `/board/${STASHED_CONTENT_ID}`,
  );
  const isShouldUsePictonizer = prompt.shouldUsePictonizer;
  return {
    isPictoGenerationActive: isShouldUsePictonizer && isStashedContentView,
    isStashedContentView,
    isShouldUsePictonizer,
  };
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

  const setUpdatedTile = useUpdatedTileSynchronizer();

  const updateTilePropsSaver = useUpdateTilePropsSaver();

  const addGeneratedPicto = useCallback(
    (
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
      return updatedTile;
    },
    [setUpdatedTile],
  );

  const generatePictoForTile = useCallback(
    async (injectedLabel: string | null = null) => {
      setIsChangingPicto(true);
      if (tile.label) {
        try {
          const generatedPicto = await createAIPicto(
            injectedLabel ?? tile.label,
          );

          if (generatedPicto) {
            const updatedTile = addGeneratedPicto(
              tile,
              generatedPicto,
              generatedPicto.url,
            );
            setIsChangingPicto(false);

            const lastSuggestedImagesIndex =
              updatedTile?.suggestedImages.length ?? 1 - 1;
            setSelectedImageSuggestion(lastSuggestedImagesIndex);
          }
        } catch (error) {
          console.error('Error generating picto.', getErrorMessage(error));
          setIsChangingPicto(false);
        }
      }
    },
    [addGeneratedPicto, tile],
  );

  const handleNextImage = useCallback(async () => {
    if (isChangingPicto) return;
    const unviewvedPictoGeneratedId =
      generatedPicto?.changeImageIds && generatedPicto?.changeImageIds[0];

    if (
      (suggestedImages && unviewvedPictoGeneratedId) ||
      !suggestedImages ||
      suggestedImages?.length === 0
    ) {
      if (!generatedPicto) {
        await generatePictoForTile();
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
          console.error(
            'Error changing generated picto',
            getErrorMessage(error),
          );
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
  }, [
    isChangingPicto,
    generatedPicto,
    suggestedImages,
    selectedImageSuggestion,
    addGeneratedPicto,
    tile,
    generatePictoForTile,
    updateTilePropsSaver,
  ]);

  const onTileClick = () => {
    //setIsEditing(true);
    !isEditionView ? handleNextImage() : setIsEditing(true);
    handleTileClick(tile.id);
  };

  const unviewvedPictoGenerated = generatedPicto?.changeImageIds?.length;
  const suggestedImagesLength =
    (suggestedImages?.length || 0) + (unviewvedPictoGenerated || 0);

  const prevIsEditingRef = useRef(false);
  const [pictogramIndexBeforeSave, setPictogramIndexBeforeSave] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (isEditing && !prevIsEditingRef.current) {
      const suggestedInitialIndex = tile.suggestedImages?.findIndex(
        (suggestion) => suggestion === tile.image,
      );
      const initialIndex =
        suggestedInitialIndex && suggestedInitialIndex > 0
          ? suggestedInitialIndex
          : null;

      setPictogramIndexBeforeSave(initialIndex);
    }
    prevIsEditingRef.current = isEditing;
  }, [isEditing, tile]);

  const image = tile.image;

  const { isPictoGenerationActive } = useGeneratePictoActive();
  const [isGeneratingPictoOnMount, setIsGeneratingPictoOnMount] =
    useState(false);
  useEffect(() => {
    if (image === '' && isPictoGenerationActive && !isGeneratingPictoOnMount) {
      setIsGeneratingPictoOnMount(true);
      handleNextImage();
    }
  }, [
    image,
    handleNextImage,
    isPictoGenerationActive,
    isGeneratingPictoOnMount,
  ]);

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
        sx={{
          minWidth: 'auto',
          p: '3px 5px 3px 5px',
        }}
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
          isChangingPicto={isChangingPicto}
          generatePicto={generatePictoForTile}
          pictogramIndexBeforeSave={pictogramIndexBeforeSave}
          setUpdatedTile={setUpdatedTile}
        />
      )}
    </>
  );
}
