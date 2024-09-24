'use server';

import { PromptRecord } from '@/commonTypes/Prompt';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';
import { getUserBoards } from '@/db/services/Board/service';
import { unstable_cache } from 'next/cache';

export type SavedBoardsData = {
  id: string;
  isSavedBoard: boolean;
  prompt: PromptRecord;
  date: Date | string;
};

export async function getSavedBoardsData(): Promise<SavedBoardsData[]> {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoardsData = await getUserBoards({
    userId: session.cboard_user.id,
  });

  const savedBoardsList = savedBoardsData.map((board) => {
    const prompt = board.prompt;

    const promptItem: PromptRecord = {
      description: prompt?.description ?? '',
      rows: prompt?.rows ?? 0,
      columns: prompt?.columns ?? 0,
      colorScheme: prompt?.colorScheme ?? 'fitzgerald',
      shouldUsePictonizer: prompt?.shouldUsePictonizer ?? false,
    };
    const createdAt =
      typeof board.createdAt !== 'string'
        ? board.createdAt.toISOString()
        : board.createdAt;

    return {
      id: board._id.toString(),
      isSavedBoard: true,
      prompt: promptItem,
      date: createdAt,
    };
  });
  return savedBoardsList;
}

export async function removeSavedBoardsData(data: SavedBoardsData) {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  console.log('removing ', data);
}

export const getCachedSavedBoardsData = unstable_cache(
  async () => getSavedBoardsData(),
  ['savedBoards'],
  { tags: ['savedBoards'] },
);
