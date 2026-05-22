import { useEffect, useState } from "react";

const LINES = [
  "[ OK ] booting temo.bash kernel v6.6.6",
  "[ OK ] mounting /dev/sda1 → /root",
  "[ .. ] probing network interfaces",
  "[ OK ] wlan0: monitor mode enabled",
  "[ OK ] loading payload modules [recon, exploit, post]",
  "[ .. ] handshaking with node 0x7F",
  "[ !! ] signal interference detected",
  "[ .. ] re-routing through proxy 0xDEAD",
  "[ OK ] firewall: bypass route discovered",
  "[ OK ] decrypting subject_0x7F profile",
  "[ .. ] injecting session token",
  "[ !! ] kernel panic — recovering",
  "[ OK ] memory bus realigned",
  "[ .. ] forging credentials",
  "[ OK ] root shell acquired",
  "[ OK ] all systems nominal",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [pct, setPct] = useState(0);
  const [granted, setGranted] = useState(false);
  const [fading, setFading] = useState(false);
  const [glitchBurst, setGlitchBurst] = useState(false);

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
    }, 280);

    // Random glitch bursts throughout
    const burstTimer = setInterval(() => {
      setGlitchBurst(true);
      setTimeout(() => setGlitchBurst(false), 220 + Math.random() * 280);
    }, 900);

    const startTs = performance.now();
    const dur = 5200;
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - startTs;
      // non-linear: stalls and jumps to feel unstable
      let p = (elapsed / dur) * 100;
      // inject stalls around 30% and 70%
      if (p > 28 && p < 36) p = 28 + (p - 28) * 0.25;
      if (p > 65 && p < 78) p = 65 + (p - 65) * 0.35;
      p = Math.min(100, p);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setGranted(true);
        setTimeout(() => setFading(true), 1100);
        setTimeout(onDone, 1700);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(lineTimer);
      clearInterval(burstTimer);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <div
      className={`boot-screen ${fading ? "boot-fade" : ""} ${glitchBurst ? "boot-glitching" : ""}`}
      role="dialog"
      aria-label="System boot"
    >
      {/* RGB split / tear slices */}
      <div className="boot-tear boot-tear-r" aria-hidden />
      <div className="boot-tear boot-tear-g" aria-hidden />
      <div className="boot-tear boot-tear-b" aria-hidden />
      <div className="boot-slice boot-slice-1" aria-hidden />
      <div className="boot-slice boot-slice-2" aria-hidden />
      <div className="boot-slice boot-slice-3" aria-hidden />

      <button onClick={onDone} className="boot-skip" aria-label="Skip intro">
        [ skip ] ESC
      </button>

      <div className="boot-inner">
        <div className="boot-header glitch" data-text="temo.bash // secure shell">
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
