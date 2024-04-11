import dbConnect from '@/lib/dbConnect';
import { stringToObjectId } from '@/db/utils/helpers';
import Board, { type DbBoardRecord } from './model';
import { BoardRecord } from '@/commonTypes/Board';
import Prompt from '../Prompt/model';

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

export async function getUserBoards({ userId }: { userId: string }) {
  await dbConnect();
  console.log('get boards');

  const boards = await Board.find(
    { userId },
    { _id: 1, promptId: 1, lastEdited: 1 },
  )
    .lean()
    .exec();
  //populate every board with the prompt using the promptId
  for (const board of boards) {
    const promptId = board.promptId;
    const frontEndRequirement = {
      description: true,
      rows: true,
      columns: true,
      colorScheme: true,
      shouldUsePictonizer: true,
    };
    const prompt = await Prompt.findById(promptId, frontEndRequirement)
      .lean()
      .exec();
    console.log('prompt', prompt);
    if (prompt) {
      board.prompt = prompt;
    }
    delete board.promptId;
  }
  console.log('boards', boards);
  return boards;
}
