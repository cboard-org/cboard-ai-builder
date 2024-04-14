import mongoose, { Schema } from 'mongoose';
import { type BoardRecord } from '@/commonTypes/Board';
import { TileRecord } from '@/commonTypes/Tile';

export type DbBoardRecord = BoardRecord & {
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const BoardSchema = new Schema<DbBoardRecord>(
  {
    userId: {
      type: String,
      required: [true, 'Please provide a userId for this board.'],
      index: true,
    },
    promptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prompt',
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    tiles: {
      type: Array<TileRecord>(),
      required: true,
    },
    isFixed: {
      type: Boolean,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lastEdited: {
      type: String,
      required: true,
    },
    grid: {
      type: Object,
      required: true,
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
  },
  { timestamps: true },
);

const Board: mongoose.Model<DbBoardRecord> =
  mongoose.models.Board || mongoose.model<DbBoardRecord>('Board', BoardSchema);

export default Board;
