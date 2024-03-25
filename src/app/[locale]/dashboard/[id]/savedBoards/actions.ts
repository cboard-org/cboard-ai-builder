'use server';

import { PromptRecord } from '@/commonTypes/Prompt';
import { BoardRecord } from '@/commonTypes/Board';
import testBoard from '../@board/testBoard.json';

export type SavedBoardsData = {
  id: string;
  board: BoardRecord;
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
    id: '1',
    board: testBoard[0],
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
    id: '2',
    board: testBoard[1],
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
    id: '3',
    board: testBoard[1],
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
    id: '4',
    board: testBoard[1],
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
