'use server';
import { BoardRecord } from '@/commonTypes/Board';
import { TileRecord } from '@/commonTypes/Tile';
import moment from 'moment';
import { Suggestion, AIImage } from 'cboard-ai-engine';
import shortid from 'shortid';
import { Session } from 'next-auth';

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
      suggestedImages: images[0] !== '' ? images : null,
    });
  }
  return cboardTiles;
};

export const toCboardAdapter = async ({
  suggestions,
  columns,
  rows,
  prompt,
  session,
  locale,
}: {
  suggestions: Suggestion[];
  columns: number;
  rows: number;
  prompt: string;
  session: Session;
  locale: string;
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
  const newBoard: BoardRecord = {
    isPublic: false,
    id: shortid.generate(),
    createdAt: moment().format(),
    updatedAt: moment().format(),
    tiles,
    grid: { order, rows, columns },
    //Engine should provide the title to be used as name
    name: prompt,
    cellSize: 'medium',
    locale: locale,
    format: 'cboard',
    description:
      'Board Automatically generated using the Cboard AI Builder - Prompt used: ' +
      prompt,
    isFixed: true,
    email: session?.user?.email,
    author: session?.user?.name,
    lastEdited: moment().format(),
    hidden: false,
    focusedTileId: tiles[0].id,
    promptId: shortid.generate(),
  };
  return newBoard;
};
