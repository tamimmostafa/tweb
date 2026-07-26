import { useEffect, useState } from "react";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    const duration = 1600;
    let raf = 0;
    let start = 0;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(100, ((ts - start) / duration) * 100);
      setPct(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setFading(true), 400);
        setTimeout(onDone, 900);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Loading"
    >
      <div className="w-full max-w-md px-6 text-center">
        <h1 className="font-serif text-2xl tracking-tight text-foreground">Tamim Mostafa</h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">Loading portfolio…</p>

        <div className="mt-8">
          <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>progress</span>
            <span>{Math.floor(pct)}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden border border-border bg-surface">
            <div
              className="h-full bg-foreground transition-[width] duration-75 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
