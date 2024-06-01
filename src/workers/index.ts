import { Worker } from 'bullmq';

const worker = new Worker(
  'foo',
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log(job.data);
  },
  {
    connection: {
      host: 'localhost',
      port: 6379,
    },
  },
);
worker.on('ready', () => {
  console.log('Worker is ready');
});
worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});
