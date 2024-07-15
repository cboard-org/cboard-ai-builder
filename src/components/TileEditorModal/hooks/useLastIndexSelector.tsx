import React, { useEffect, useMemo, useState } from 'react';
import { TileRecord } from '@/commonTypes/Tile';

type UseLastIndexSelectorProps = {
  tile: TileRecord;
  setTile: React.Dispatch<React.SetStateAction<TileRecord>>;
  primaryTile: TileRecord;
  slides: string[];
  onThumbClick: (index: number) => void;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const useLastIndexSelector = ({
  tile,
  setTile,
  primaryTile,
  slides,
  onThumbClick,
  setSelectedIndex,
}: UseLastIndexSelectorProps) => {
  const suggetionsCounter = useMemo(() => {
    return tile.suggestedImages?.length;
  }, [tile.suggestedImages]);

  const [mustForceSelectedIndex, setMustForceSelectedIndex] = useState(false);
  useEffect(() => {
    if (!suggetionsCounter) return;
    const suggestedIndex = suggetionsCounter - 1;
    setTile((prevTile) => {
      if (
        prevTile.suggestedImages?.length ===
          primaryTile.suggestedImages?.length &&
        !mustForceSelectedIndex
      )
        return prevTile;
      setMustForceSelectedIndex(false);
      setSelectedIndex(suggestedIndex);
      onThumbClick(suggestedIndex);
      return {
        ...prevTile,
        image: slides[suggestedIndex],
      };
    });
  }, [
    suggetionsCounter,
    onThumbClick,
    slides,
    primaryTile.suggestedImages,
    mustForceSelectedIndex,
    setSelectedIndex,
    setTile,
  ]);
  return { setMustForceSelectedIndex };
};

export default useLastIndexSelector;
