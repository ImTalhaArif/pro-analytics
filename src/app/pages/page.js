import { useState } from 'react';

export default function Home() {
  const [logs, setLogs] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logs.split('\n')),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Log Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={logs}
          onChange={(e) => setLogs(e.target.value)}
          rows="10"
          cols="50"
          placeholder="Paste log entries here, one per line"
        />
        <br />
        <button type="submit">Process Logs</button>
      </form>

      {result && (
        <div>
          <h2>Age Distribution</h2>
          <pre>{JSON.stringify(result.age_distribution, null, 2)}</pre>
          <h2>Extracted Data</h2>
          <pre>{JSON.stringify(result.extracted_data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
