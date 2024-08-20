'use server';

import { PromptRecord } from '@/commonTypes/Prompt';
import { getPromptHistoryList, softDelete } from '@/db/services/Prompt/service';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';
import { revalidatePath } from 'next/cache';

export type HistoryData = {
  id: string;
  prompt: PromptRecord;
  date: Date | string;
};

export async function getPromptHistoryData(): Promise<HistoryData[]> {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('No session found');
  }

  const promptHistoryList = await getPromptHistoryList({
    userId: session.cboard_user.id,
  });
  const historyData: HistoryData[] = promptHistoryList.map((prompt) => {
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
  return historyData;
}

export async function removeHistoryData(promptId: string) {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('No session found');
  }
  const response = await softDelete(session.cboard_user.id, promptId);
  revalidatePath('/');
  return response;
}
