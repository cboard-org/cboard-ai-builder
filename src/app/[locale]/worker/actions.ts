'use server';
import { Queue } from 'bullmq';
export async function addJob(data: string) {
  const queue = new Queue('foo', {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT ?? 6379),
    },
  });
  await queue.add('myJobName', { foo: data });
  return {};
}
