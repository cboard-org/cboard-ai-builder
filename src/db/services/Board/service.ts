import dbConnect from '@/lib/dbConnect';
import { stringToObjectId } from '@/db/utils/helpers';
import Board, { type DbBoardRecord } from './model';
import { BoardRecord } from '@/commonTypes/Board';

export async function create(board: DbBoardRecord) {
  await dbConnect();

  const dbBoard = new Board(board);
  const savedBoard = await dbBoard.save();
  return savedBoard.toJSON();
}

export async function update(board: BoardRecord) {
  await dbConnect();

  const filter = { _id: board._id };
  const updatedBoard = await Board.findOneAndUpdate(filter, board);
  if (!updatedBoard) throw new Error('Board not found');
  return updatedBoard.toJSON();
}

export async function get(id: string) {
  await dbConnect();

  const parsedId = stringToObjectId(id);
  if (!parsedId) throw new Error('Please provide a valid board id');

  const board = await Board.findById(parsedId).lean().exec();
  if (board) return board;

  return null;
}
