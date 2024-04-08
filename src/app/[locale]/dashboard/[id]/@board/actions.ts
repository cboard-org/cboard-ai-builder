'use server';

import { BoardRecord } from '@/commonTypes/Board';
import { create, get } from '@/db/services/Board/service';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';

export const saveBoard = async (board: BoardRecord) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await create({ ...board, userId: session.cboard_user.id });
  return savedBoard;
};

export const getBoard = async (id: string) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await get(id);
  return savedBoard;
};
