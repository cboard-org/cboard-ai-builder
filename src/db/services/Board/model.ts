import mongoose from 'mongoose';
import { BoardRecord } from '@/app/[locale]/dashboard/@board/types';
import { TileRecord } from '@/app/[locale]/dashboard/@board/types';

type Board = mongoose.Document & BoardRecord;

const BoardSchema = new mongoose.Schema<Board>({
  id: {
    type: String,
    required: [true, 'Please provide an id for this board.'],
  },
  isPublic: {
    type: Boolean,
    required: [true, 'Please specify if this board is public.'],
  },
  tiles: {
    type: Array<TileRecord>(),
    required: [true, 'Please provide tiles for this board.'],
  },
  isFixed: {
    type: Boolean,
    required: [true, 'Please specify if this board is fixed.'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author for this board.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email for this board.'],
  },
  lastEdited: {
    type: String,
    required: [true, 'Please provide the last edited date for this board.'],
  },
  grid: {
    type: Object,
    required: [true, 'Please provide a grid for this board.'],
  },
  cellSize: {
    type: String,
  },
  locale: {
    type: String,
  },
  format: {
    type: String,
  },
  description: {
    type: String,
  },
  nameKey: {
    type: String,
  },
  caption: {
    type: String,
  },
  hidden: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  prevId: {
    type: String,
  },
  focusedTileId: {
    type: String,
  },
});

export default mongoose.models.Board ||
  mongoose.model<Board>('Board', BoardSchema);
