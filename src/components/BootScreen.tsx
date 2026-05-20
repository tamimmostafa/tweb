import { useEffect, useState } from "react";

const LINES = [
  "[ OK ] booting temo.bash kernel v6.6.6",
  "[ OK ] mounting /dev/sda1 → /root",
  "[ .. ] probing network interfaces",
  "[ OK ] wlan0: monitor mode enabled",
  "[ OK ] loading payload modules [recon, exploit, post]",
  "[ .. ] handshaking with node 0x7F",
  "[ OK ] firewall: bypass route discovered",
  "[ OK ] decrypting subject_0x7F profile",
  "[ .. ] injecting session token",
  "[ OK ] all systems nominal",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [pct, setPct] = useState(0);
  const [granted, setGranted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    let i = 0;
    const lineTimer = setInterval(() => {
      if (i < LINES.length) {
        setLines((l) => [...l, LINES[i]]);
        i++;
      } else {
        clearInterval(lineTimer);
      }
    }, 180);

    const startTs = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = () => {
      const p = Math.min(100, ((performance.now() - startTs) / dur) * 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setGranted(true);
        setTimeout(() => setFading(true), 700);
        setTimeout(onDone, 1200);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(lineTimer);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <div className={`boot-screen ${fading ? "boot-fade" : ""}`} role="dialog" aria-label="System boot">
      <button onClick={onDone} className="boot-skip" aria-label="Skip intro">
        [ skip ] ESC
      </button>

      <div className="boot-inner">
        <div className="boot-header">
          <span className="text-[var(--primary)]">temo.bash</span>{" "}
          <span className="opacity-50">// secure shell</span>
        </div>

        <pre className="boot-log">
          {lines.map((l, i) => (
            <div key={i} className="boot-line">
              {l}
            </div>
          ))}
        </pre>

        <div className="boot-bar-wrap">
          <div className="boot-bar-meta">
            <span>loading…</span>
            <span>{Math.floor(pct)}%</span>
          </div>
          <div className="boot-bar">
            <div className="boot-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {granted && (
          <div className="boot-granted glitch" data-text="[ ACCESS GRANTED ]">
            [ ACCESS GRANTED ]
          </div>
        )}
      </div>
    </div>
  );
}
