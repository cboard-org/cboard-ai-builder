'use server';

import { PromptRecord } from '@/commonTypes/Prompt';
import { getPromptHistoryList } from '@/db/services/Prompt/service';
import { getServerSession } from 'next-auth';

export type HistoryData = {
  id: number | string;
  prompt: PromptRecord;
  date: Date | string;
};

export async function getHistoryData(): Promise<HistoryData[]> {
  const session = await getServerSession();
  if (!session) {
    throw new Error('No session found');
  }

  const historyList = await getPromptHistoryList({
    userId: session.cboard_user.id,
    actualPage: 1,
    limitPages: 3,
    itemsPerPage: 2,
  });
  return historyList.data.map((history) => {
    return {
      id: history._id.toString(),
      prompt: history,
      date: history.createdDate,
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
