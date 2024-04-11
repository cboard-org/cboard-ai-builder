'use server';

import { PromptRecord } from '@/commonTypes/Prompt';
import testBoard from '../@board/testBoard.json';

export type SavedBoardsData = {
  id: string;
  isSavedBoard: boolean;
  prompt: PromptRecord;
  date: Date | string;
};

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const todayMinsAgo = new Date();
todayMinsAgo.setMinutes(todayMinsAgo.getMinutes() - 10);
const todayHoursAgo = new Date();
todayHoursAgo.setHours(todayHoursAgo.getHours() - 3);
const fake_db: SavedBoardsData[] = [
  {
    id: testBoard[0].id,
    isSavedBoard: true,
    prompt: {
      description: 'pretty family in a camp with a cup',
      rows: 5,
      columns: 5,
      colorScheme: 'fitzgerald',
      shouldUsePictonizer: true,
    },
    date: todayMinsAgo.toISOString(),
  },
  {
    id: testBoard[1].id,
    isSavedBoard: true,
    prompt: {
      description: 'pretty family in a camp with a cup',
      rows: 5,
      columns: 5,
      colorScheme: 'fitzgerald',
      shouldUsePictonizer: true,
    },
    date: todayHoursAgo.toISOString(),
  },
  {
    id: '2',
    isSavedBoard: true,
    prompt: {
      description: 'an arabic famm',
      rows: 5,
      columns: 5,
      colorScheme: 'fitzgerald',
      shouldUsePictonizer: true,
    },
    date: yesterday.toISOString(),
  },
  {
    id: testBoard[3].id,
    isSavedBoard: true,
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

export async function getSavedBoardsData(): Promise<SavedBoardsData[]> {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  // Here we query DB
  return fake_db;
}

export async function removeSavedBoardsData(data: SavedBoardsData) {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  console.log('removing ', data);
}
