import { useEffect, useState } from "react";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    const duration = 1400;
    let raf = 0;
    let start = 0;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(100, ((ts - start) / duration) * 100);
      setPct(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setFading(true), 300);
        setTimeout(onDone, 800);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Loading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] grid-dots"
      />
      <div className="relative w-full max-w-md px-6">
        <div className="border-2 border-foreground bg-background p-8" style={{ boxShadow: "12px 12px 0 0 var(--foreground)" }}>
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border-2 border-foreground bg-foreground font-mono text-sm font-bold text-background">
              T
            </span>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">
                SYSTEM_ARCH_V1.0
              </p>
              <p className="font-mono text-sm font-bold uppercase tracking-tighter">
                TAMIM_MOSTAFA
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex justify-between font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">
              <span>BOOTING PORTFOLIO</span>
              <span>{Math.floor(pct).toString().padStart(3, "0")}%</span>
            </div>
            <div className="h-3 w-full border-2 border-foreground bg-background">
              <div
                className="h-full bg-foreground transition-[width] duration-75 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
