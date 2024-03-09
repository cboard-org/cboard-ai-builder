'use server';
import { BoardRecord } from '@/app/[locale]/dashboard/@board/types';
import { TileRecord } from '@/components/Tile/types';
import testBoard from '@/dashboard/@board/testBoard.json';
import { Suggestion, AIImage } from 'cboard-ai-engine';

const generateId = () => Math.floor(Math.random() * 1000000);

const toCboardTilesAdapter = async (
  tiles: Suggestion[],
): Promise<TileRecord[]> => {
  const cboardTiles: TileRecord[] = [];
  for (const tile of tiles) {
    const id = generateId().toString();
    const getTileImages = async (pictogram: Suggestion['pictogram']) => {
      if (pictogram.isAIGenerated) {
        const images: string[] = [];
        for (const image of pictogram.images) {
          const generatedPictogram = image as AIImage;
          if (generatedPictogram.ok && generatedPictogram.blob) {
            const buffer = await generatedPictogram.blob.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64');
            images.push(base64);
          }
          images.push('');
        }
        return images;
      }
      return pictogram.images.map((image) => {
        const pictogram = image as {
          id: string;
          symbolSet: string;
          url: string;
        };
        return pictogram.url;
      });
    };

    const images = await getTileImages(tile.pictogram);
    cboardTiles.push({
      id: id,
      label: tile.label,
      backgroundColor: 'rgb(200, 200, 200)',
      borderColor: 'rgb( 255, 0,  0) ',
      image: images[0],
    });
  }
  return cboardTiles;
};

export const toCboardAdapter = async ({
  suggestions,
  columns,
  rows,
}: {
  suggestions: Suggestion[];
  columns: number;
  rows: number;
}): Promise<BoardRecord> => {
  if (!suggestions.length || !columns || !rows)
    throw new Error('Invalid input on Cboard adapter');
  const tiles = await toCboardTilesAdapter(suggestions);

  const createMultidimensionalArray = (
    originalArray: string[],
    columns: number,
  ) => {
    const multidimensionalArray = [];

    for (let i = 0; i < originalArray.length; i += columns) {
      const subarray = originalArray.slice(i, i + columns);
      multidimensionalArray.push(subarray);
    }

    return multidimensionalArray;
  };
  const tilesIds = tiles.map((tile) => tile.id);
  const order = createMultidimensionalArray(tilesIds, columns);
  return {
    ...testBoard[1],
    tiles,
    grid: { order, rows, columns },
  };
};
