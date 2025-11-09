export default function Footer() {
  return (
    <footer className="w-full bg-black py-10 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-neutral-400">
            Built as a gamified CTF portfolio. Flags validate server‑side when configured.
          </p>
          <div className="text-sm text-neutral-500">
            <span className="font-mono">> stay curious, stay blue</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
