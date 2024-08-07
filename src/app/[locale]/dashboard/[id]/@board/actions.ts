'use server';

import { BoardRecord } from '@/commonTypes/Board';
import { create, get, update } from '@/db/services/Board/service';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';

export const saveBoard = async (board: BoardRecord) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await create({ ...board, userId: session.cboard_user.id });
  const { _id, ...newBoard } = savedBoard;

  return {
    ...newBoard,
    id: _id.toString(),
    promptId: savedBoard.promptId?.toString(),
  };
};

export const updateBoard = async (board: BoardRecord) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await update(board);
  const { _id, ...newBoard } = savedBoard;
  newBoard.id = _id.toString();
  if (typeof newBoard.createdAt !== 'string')
    newBoard.createdAt = newBoard.createdAt.toISOString();
  if (typeof newBoard.updatedAt !== 'string')
    newBoard.updatedAt = newBoard.updatedAt.toISOString();
  newBoard.promptId = board.promptId?.toString();

  return newBoard;
};

export const getBoard = async (id: string) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await get(id);
  if (!savedBoard) throw new Error('Board not found');
  const { _id, ...board } = savedBoard;
  board.id = _id.toString();
  if (typeof board.createdAt !== 'string')
    board.createdAt = board.createdAt.toISOString();
  if (typeof board.updatedAt !== 'string')
    board.updatedAt = board.updatedAt.toISOString();
  board.promptId = board.promptId?.toString();

  return board;
};
