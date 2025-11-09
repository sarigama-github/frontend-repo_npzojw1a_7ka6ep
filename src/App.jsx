import HeroSection from './components/HeroSection';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';

function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-sm text-emerald-300">CTF-Net</span>
        </div>
        <nav className="flex items-center gap-5 text-sm text-neutral-300">
          <a href="#dashboard" className="hover:text-white">Dashboard</a>
          <a href="#leaderboard" className="hover:text-white">Leaderboard</a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black">
      <NavBar />
      <HeroSection />
      <div id="leaderboard">
        <Dashboard />
        <Leaderboard />
      </div>
      <Footer />
    </div>
  );
}
