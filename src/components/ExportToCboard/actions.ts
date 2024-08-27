'use server';

import { BoardRecord } from '@/commonTypes/Board';
import { saveTemporaryBoard } from '@/lib/cboard-api/board';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';

export async function exportBoardToCboard(board: BoardRecord) {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const credentials = {
    email: session.cboard_user.email,
    authToken: session.cboard_user.authToken as string,
  };

  try {
    const response = await saveTemporaryBoard(board, credentials);
    const data = await response.json();
    const url = `${process.env.CBOARD_APP_URL_!}board/${data.id}?cbuilder=true`;
    return {
      message: 'Board exported',
      ok: true,
      boardId: data.id as string,
      url,
    };
  } catch (error) {
    throw new Error('Error exporting board' + (error as Error).message);
  }
}
