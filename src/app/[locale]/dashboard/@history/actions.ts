'use server';

export type HistoryRow = {
  id: number | string;
  prompt: string;
  date: Date | string;
};

const fake_db = [
  {
    id: 1,
    prompt: 'Little family in a camp with a cup',
    date: 'Yesterday',
  },
  {
    id: 2,
    prompt: 'Little family in a camp with a cup',
    date: 'Yesterday',
  },
  {
    id: 3,
    prompt: 'Little family in a camp with a cup',
    date: 'Yesterday',
  },
  {
    id: 4,
    prompt: 'Little family in a camp with a cup',
    date: 'Yesterday',
  },
];

export async function getHistoryData(): Promise<HistoryRow[]> {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  // Here we query DB
  return fake_db;
}

export async function removeHistory(history: HistoryRow) {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  console.log('removing ', history);
}
