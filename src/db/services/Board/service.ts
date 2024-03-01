import dbConnect from '@/lib/dbConnect';
import { stringToObjectId } from '@/db/utils/helpers';
import Board from './model';
import { BoardRecord } from '@/app/[locale]/dashboard/@board/types';

export async function create(board: BoardRecord) {
  try {
    await dbConnect();

    const newBoard = await Board.create({ ...board });

    return {
      newBoard,
    };
  } catch (error) {
    return { error };
  }
}

export async function get(id: string) {
  try {
    await dbConnect();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: 'Board not found' };
    }

    const board = await Board.findById(parsedId).lean().exec();

    if (board) {
      return {
        board,
      };
    } else {
      return { error: 'Board not found' };
    }
  } catch (error) {
    return { error };
  }
}
