'use server';

import { PromptRecord } from '@/commonTypes/Prompt';

export type HistoryData = {
  id: number | string;
  prompt: PromptRecord;
  date: Date | string;
};

export async function getHistoryData(): Promise<HistoryData[]> {
  return [];
}

export async function removeHistoryData(data: HistoryData) {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  console.log('removing ', data);
}
