import { Worker } from 'bullmq';
// import { submit } from '@/app/[locale]/dashboard/[id]/@promptForm/actions';

export const worker = new Worker(
  'foo',
  async (job) => {
    console.log(process.env.MONGO_URL);
    // TODO: fix how we initialize the database connection, the dbConnect.ts file is reading the env var before it gets processed by the daemon
    // console.log(submit);
    console.log(`Received: ${JSON.stringify(job)}`);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT ?? 6379),
    },
  },
);
