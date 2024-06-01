'use client';
import { useState } from 'react';
import { addJob } from './actions';

export default function Worker() {
  const [data, setData] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  return (
    <div>
      <h1>Worker sample page</h1>
      <input
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Data to send to job"
      />
      <button
        onClick={async () => {
          console.log(`sending ${data}`);
          await addJob(data);
          setLogs([`Sent "${data}" to job`, ...logs]);
          setData('');
        }}
      >
        Send
      </button>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
