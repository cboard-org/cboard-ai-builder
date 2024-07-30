import { useEffect } from 'react';
import { TileRecord } from '@/commonTypes/Tile';

const usePrimarySuggestedImagesMerger = (
  primaryTile: TileRecord,
  setTile: React.Dispatch<React.SetStateAction<TileRecord>>,
) => {
  const primarySuggestedImages = primaryTile.suggestedImages;
  const generatedPicto = primaryTile.generatedPicto;
  useEffect(() => {
    if (primarySuggestedImages) {
      setTile((prevTile) => {
        const currentSuggestedImages = prevTile.suggestedImages || [];
        const newSuggestedImages = Array.from(
          new Set([...currentSuggestedImages, ...primarySuggestedImages]),
        );
        return {
          ...prevTile,
          suggestedImages: newSuggestedImages,
          generatedPicto,
        };
      });
    }
  }, [primarySuggestedImages, setTile, generatedPicto]);
};

export default usePrimarySuggestedImagesMerger;
