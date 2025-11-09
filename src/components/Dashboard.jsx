import { motion, AnimatePresence } from 'framer-motion';
import ChallengeCard from './ChallengeCard';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_CHALLENGES = [
  {
    id: 'about',
    title: 'Decode the Transmission',
    concept: 'Encoding',
    prompt:
      'The base64 string reveals my "About". Decode: ZmV0Y2ggKVsgYWN0aXZhdGUgY29udGV4dF0=',
  },
  {
    id: 'skills',
    title: 'Robots Recon',
    concept: 'Enumeration',
    prompt:
      'Which path is disallowed for bots? Inspect /robots.txt in the API mock. Flag format: ctf{path}',
  },
  {
    id: 'projects',
    title: 'Blind Injection',
    concept: 'SQLi',
    prompt:
      'A simple boolean-based check guards the projects. Can you guess the flag? (Use demo flags provided.)',
  },
  {
    id: 'certs',
    title: 'OSINT Alias',
    concept: 'OSINT',
    prompt:
      'Find the handle used across platforms: hint embedded in page source as a data attribute.',
  },
];

export default function Dashboard() {
  const [unlocked, setUnlocked] = useState(() => {
    const saved = localStorage.getItem('ctf_unlocked');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ctf_unlocked', JSON.stringify(unlocked));
  }, [unlocked]);

  const baseUrl = import.meta.env.VITE_BACKEND_URL || '';

  const submitFlag = async (sectionId, flag) => {
    try {
      if (!baseUrl) {
        // Fallback demo local validation so UI works without backend
        const demoFlags = {
          about: 'ctf{decode_me}',
          skills: 'ctf{/admin}',
          projects: 'ctf{union_select}',
          certs: 'ctf{r3c0nn00b}',
        };
        const ok = demoFlags[sectionId] && demoFlags[sectionId] === flag;
        if (ok) setUnlocked((prev) => Array.from(new Set([...prev, sectionId])));
        return ok;
      }

      const res = await fetch(`${baseUrl}/api/validate-flag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'guest', flag }),
      });
      const data = await res.json();
      if (data?.success && data?.unlockedSection) {
        setUnlocked((prev) => Array.from(new Set([...prev, data.unlockedSection])));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return (
    <section id="dashboard" className="relative w-full bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Main Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="h-2 w-48 overflow-hidden rounded bg-neutral-800">
              <motion.div
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${(unlocked.length / DEFAULT_CHALLENGES.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
            <span className="text-sm text-neutral-300">
              {unlocked.length}/{DEFAULT_CHALLENGES.length} unlocked
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {DEFAULT_CHALLENGES.map((c) => (
            <ChallengeCard
              key={c.id}
              title={c.title}
              concept={c.concept}
              prompt={c.prompt}
              solved={unlocked.includes(c.id)}
              onSubmit={(flag) => submitFlag(c.id, flag)}
            />
          ))}
        </div>

        <ContentReveal unlocked={unlocked} />
      </div>
    </section>
  );
}

function ContentReveal({ unlocked }) {
  return (
    <div className="mt-14 space-y-10">
      <RevealBlock id="about" title="About Me" unlocked={unlocked.includes('about')}>
        <p className="text-neutral-300">
          I’m a cybersecurity learner and full‑stack developer who loves building realistic
          practice labs and defensive tools. My interests include web security, cloud
          hardening, and exploit development.
        </p>
      </RevealBlock>

      <RevealBlock id="skills" title="Skills" unlocked={unlocked.includes('skills')}>
        <ul className="list-inside list-disc text-neutral-300">
          <li>Offensive: web pentesting, OWASP Top 10, Burp, recon automation</li>
          <li>Defensive: SIEM basics, log analysis, hardening, threat modeling</li>
          <li>Dev: JavaScript/TypeScript, Python, FastAPI, React, Docker</li>
          <li>Cloud & CI/CD: GitHub Actions, containers, IaC basics</li>
        </ul>
      </RevealBlock>

      <RevealBlock id="projects" title="Projects" unlocked={unlocked.includes('projects')}>
        <ul className="space-y-2 text-neutral-300">
          <li>
            • VulnLab: mini vulnerable apps for training; includes auth, IDOR, SSRF, SQLi
          </li>
          <li>• ReconBot: automation pipeline for subdomain and content discovery</li>
          <li>• BlueWatch: lightweight dashboard for homelab telemetry</li>
        </ul>
      </RevealBlock>

      <RevealBlock id="certs" title="Certifications" unlocked={unlocked.includes('certs')}>
        <p className="text-neutral-300">eJPT (in progress), PNPT (target), HTB tracks</p>
      </RevealBlock>
    </div>
  );
}

function RevealBlock({ title, unlocked, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            unlocked
              ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
              : 'bg-red-500/10 text-red-300 ring-1 ring-red-400/30'
          }`}
        >
          {unlocked ? 'Unlocked' : 'Locked'}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {unlocked ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-md border border-neutral-800 bg-neutral-900/50 p-5"
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-md border border-neutral-800 bg-neutral-950/60 p-5 text-neutral-500"
          >
            Solve the related challenge to reveal this section.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
