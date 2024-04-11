import dbConnect from '@/lib/dbConnect';
import { stringToObjectId } from '@/db/utils/helpers';
import Board, { type DbBoardRecord } from './model';

export async function create(board: DbBoardRecord) {
  await dbConnect();

  const dbBoard = new Board(board);
  const savedBoard = await dbBoard.save();
  return savedBoard.toJSON();
}

export async function get(id: string) {
  await dbConnect();

  const parsedId = stringToObjectId(id);
  if (!parsedId) throw new Error('Please provide a valid board id');

  const board = await Board.findById(parsedId).lean().exec();
  if (board) return board;

  return null;
}
