import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  const [typed, setTyped] = useState('');
  const text = useRef(
    'Welcome, Operator. Your mission: Enumerate, exploit, and unlock the portfolio. '
  );

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(text.current.slice(0, i + 1));
      i++;
      if (i >= text.current.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, []);

  const handleEnter = () => {
    const el = document.getElementById('dashboard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* subtle overlay to improve contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold sm:text-5xl md:text-6xl"
        >
          CTF Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 max-w-3xl font-mono text-sm text-emerald-200/90 sm:text-base"
        >
          $ {typed}
        </motion.p>

        <motion.button
          onClick={handleEnter}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 rounded-md border border-emerald-400 bg-emerald-500/10 px-5 py-3 font-mono text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/30 backdrop-blur transition hover:bg-emerald-500/20"
        >
          Enter the Network →
        </motion.button>
      </div>
    </section>
  );
}
