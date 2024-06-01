import { Worker } from 'bullmq';

export const worker = new Worker(
  'foo',
  async (job) => {
    console.log(`Received: ${JSON.stringify(job)}`);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT ?? 6379),
    },
  },
);
