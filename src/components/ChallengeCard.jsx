import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ChallengeCard({ title, concept, prompt, onSubmit, solved }) {
  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const ok = await onSubmit(flag);
      setStatus(ok ? 'success' : 'error');
      if (ok) setFlag('');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-lg border bg-neutral-900/60 p-5 backdrop-blur transition ${
        solved ? 'border-emerald-400/50' : 'border-neutral-700'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            solved
              ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
              : 'bg-sky-500/10 text-sky-300 ring-1 ring-sky-400/30'
          }`}
        >
          {concept}
        </span>
      </div>
      <p className="mb-4 text-sm text-neutral-300">{prompt}</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="ctf{your_flag_here}"
          className="flex-1 rounded-md border border-neutral-700 bg-black/40 px-3 py-2 font-mono text-sm text-emerald-200 outline-none ring-emerald-400/20 placeholder:text-neutral-500 focus:ring-2"
        />
        <button
          type="submit"
          disabled={solved || status === 'loading'}
          className="rounded-md border border-emerald-400 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {solved ? 'Unlocked' : status === 'loading' ? 'Checking...' : 'Submit'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-2 text-xs text-emerald-300">Flag accepted. Section unlocked!</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-300">Invalid flag. Try again.</p>
      )}
    </motion.div>
  );
}
