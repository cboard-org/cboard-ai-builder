'use server';
import { Queue } from 'bullmq';
export async function addJob(data: string) {
  const queue = new Queue('foo');
  await queue.add('myJobName', { foo: data });
  return {};
}
