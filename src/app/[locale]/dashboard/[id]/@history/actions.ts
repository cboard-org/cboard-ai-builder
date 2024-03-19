'use server';

import { PromptRecord } from '@/commonTypes/Prompt';

export type HistoryData = {
  id: number | string;
  prompt: PromptRecord;
  date: Date | string;
};

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const todayMinsAgo = new Date();
todayMinsAgo.setMinutes(todayMinsAgo.getMinutes() - 10);
const todayHoursAgo = new Date();
todayHoursAgo.setHours(todayHoursAgo.getHours() - 3);
const fake_db: HistoryData[] = [
  {
    id: 1,
    prompt: {
      description: 'Big family in a camp with a cup',
      rows: 5,
      columns: 5,
      colorScheme: 'fitzgerald',
      shouldUsePictonizer: true,
    },
    date: todayMinsAgo.toISOString(),
  },
  {
    id: 2,
    prompt: {
      description: 'small family in a camp with a cup',
      rows: 5,
      columns: 5,
      colorScheme: 'fitzgerald',
      shouldUsePictonizer: true,
    },
    date: todayHoursAgo.toISOString(),
  },
  {
    id: 3,
    prompt: {
      description: 'strange family in a camp with a cup',
      rows: 5,
      columns: 5,
      colorScheme: 'fitzgerald',
      shouldUsePictonizer: true,
    },
    date: yesterday.toISOString(),
  },
  {
    id: 4,
    prompt: {
      description: 'pretty family in a camp with a cup',
      rows: 5,
      columns: 5,
      colorScheme: 'fitzgerald',
      shouldUsePictonizer: true,
    },
    date: yesterday.toISOString(),
  },
];

export async function getHistoryData(): Promise<HistoryData[]> {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  // Here we query DB
  return fake_db;
}

export async function removeHistoryData(data: HistoryData) {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  console.log('removing ', data);
}
