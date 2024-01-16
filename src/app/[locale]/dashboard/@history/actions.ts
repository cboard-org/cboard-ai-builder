'use server';

export type HistoryRow = {
  id: number | string;
  prompt: string;
  date: Date | string;
};

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const todayMinsAgo = new Date();
todayMinsAgo.setMinutes(todayMinsAgo.getMinutes() - 10);
const todayHoursAgo = new Date();
todayHoursAgo.setHours(todayHoursAgo.getHours() - 3);
const fake_db = [
  {
    id: 1,
    prompt: 'Little family in a camp with a cup',
    date: todayMinsAgo.toISOString(),
  },
  {
    id: 2,
    prompt: 'Little family in a camp with a cup',
    date: todayHoursAgo.toISOString(),
  },
  {
    id: 3,
    prompt: 'Little family in a camp with a cup',
    date: yesterday.toISOString(),
  },
  {
    id: 4,
    prompt: 'Little family in a camp with a cup',
    date: yesterday.toISOString(),
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
