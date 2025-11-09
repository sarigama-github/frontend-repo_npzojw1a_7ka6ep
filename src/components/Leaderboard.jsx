import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || '';
    const load = async () => {
      try {
        if (!baseUrl) {
          // demo static data
          setRows([
            { username: 'guest', solved: 2, time: '05:13' },
            { username: 'neo', solved: 1, time: '02:45' },
          ]);
          return;
        }
        const res = await fetch(`${baseUrl}/api/leaderboard`);
        const data = await res.json();
        if (Array.isArray(data)) setRows(data);
      } catch (e) {
        // ignore errors in demo
      }
    };
    load();
  }, []);

  return (
    <section className="w-full bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 text-2xl font-semibold">Leaderboard</h2>
        <div className="overflow-hidden rounded-md border border-neutral-800">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-950/60">
              <tr className="text-left text-sm text-neutral-400">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Flags Solved</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/80">
              {rows.map((r, idx) => (
                <tr key={idx} className="bg-neutral-900/40 text-sm">
                  <td className="px-4 py-3">{r.username}</td>
                  <td className="px-4 py-3">{r.solved}</td>
                  <td className="px-4 py-3">{r.time}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-neutral-400">
                    No data yet. Solve some challenges!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
