'use server';

import { PromptRecord } from '@/commonTypes/Prompt';
import { getPromptHistoryList } from '@/db/services/Prompt/service';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';

export type HistoryData = {
  id: number | string;
  prompt: PromptRecord;
  date: Date | string;
};

export async function getHistoryData(): Promise<HistoryData[]> {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('No session found');
  }

  const promptHistoryList = await getPromptHistoryList({
    userId: session.cboard_user.id,
    actualPage: 1,
    limitPages: 3,
    itemsPerPage: 2,
  });
  return promptHistoryList.data.map((prompt) => {
    return {
      id: prompt._id.toString(),
      prompt: {
        description: prompt.description,
        rows: prompt.rows,
        columns: prompt.columns,
        colorScheme: prompt.colorScheme,
        shouldUsePictonizer: prompt.shouldUsePictonizer,
      },
      date: prompt.createdDate.toISOString(),
    };
  });
}

export async function removeHistoryData(data: HistoryData) {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  console.log('removing ', data);
}