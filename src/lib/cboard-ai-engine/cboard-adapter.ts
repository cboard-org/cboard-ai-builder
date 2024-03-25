'use server';
import { BoardRecord } from '@/commonTypes/Board';
import { TileRecord } from '@/commonTypes/Tile';
import testBoard from '@/dashboard/@board/testBoard.json';
import { Suggestion, AIImage } from 'cboard-ai-engine';

const DEFAULT_TILE_BACKGROUND_COLOR = 'rgb(255, 241, 118)';

const toCboardTilesAdapter = async (
  tiles: Suggestion[],
): Promise<TileRecord[]> => {
  const cboardTiles: TileRecord[] = [];
  for await (const tile of tiles) {
    const id = tile.id;
    const getTileImages = async (pictogram: Suggestion['pictogram']) => {
      if (pictogram.isAIGenerated) {
        const images: string[] = [];
        for await (const image of pictogram.images) {
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
      backgroundColor: DEFAULT_TILE_BACKGROUND_COLOR,
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
    id: 'new',
    tiles,
    grid: { order, rows, columns },
  };
};
