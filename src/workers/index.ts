// Load env vars the way next js does it
import { loadEnvConfig } from '@next/env';
loadEnvConfig('./', process.env.NODE_ENV === 'development');
// Every other import that depends on env vars should be done after calling this function^
import { worker } from './foo';

worker.on('ready', () => {
  console.log('Worker is ready');
});
worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});
