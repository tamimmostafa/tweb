import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

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

// Deterministic-ish glitch text scrambler
const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#%@&$";
function corrupt(text: string, intensity: number) {
  if (intensity <= 0) return text;
  let out = "";
  for (let i = 0; i < text.length; i++) {
    if (Math.random() < intensity) {
      out += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    } else {
      out += text[i];
    }
  }
  return out;
}

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [pct, setPct] = useState(0);
  const [granted, setGranted] = useState(false);
  const [fading, setFading] = useState(false);
  const [burstLevel, setBurstLevel] = useState(0); // 0 = idle, 1 = mild, 2 = heavy
  const [frameSkip, setFrameSkip] = useState(false);
  const [corruptPct, setCorruptPct] = useState<string | null>(null);
  const shakeControls = useAnimationControls();
  const containerControls = useAnimationControls();
  const mountedRef = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    mountedRef.current = true;

    let i = 0;
    const lineTimer = setInterval(() => {
      if (i < LINES.length) {
        setLines((l) => [...l, LINES[i]]);
        i++;
      } else {
        clearInterval(lineTimer);
      }
    }, 280);

    // Random glitch bursts: mostly mild, occasional heavy
    let burstTimeout: ReturnType<typeof setTimeout>;
    const scheduleBurst = () => {
      const delay = 600 + Math.random() * 2200;
      burstTimeout = setTimeout(() => {
        if (!mountedRef.current) return;
        const heavy = Math.random() < 0.32;
        const level = heavy ? 2 : 1;
        setBurstLevel(level);

        // vertical screen jump + shake
        const jumpY = heavy ? (Math.random() * 18 - 9) : (Math.random() * 6 - 3);
        const jumpX = heavy ? (Math.random() * 14 - 7) : (Math.random() * 4 - 2);
        shakeControls.start({
          x: [0, jumpX, -jumpX * 0.6, jumpX * 0.3, 0],
          y: [0, jumpY, -jumpY * 0.4, jumpY * 0.2, 0],
          transition: { duration: heavy ? 0.32 : 0.16, ease: "easeInOut" },
        });

        // frame skip — briefly hide everything
        if (heavy && Math.random() < 0.6) {
          setFrameSkip(true);
          setTimeout(() => mountedRef.current && setFrameSkip(false), 40 + Math.random() * 60);
        }

        // corrupt percentage briefly
        if (heavy) {
          setCorruptPct(corrupt("000", 1));
          setTimeout(() => mountedRef.current && setCorruptPct(null), 120);
        }

        const dur = heavy ? 320 + Math.random() * 280 : 140 + Math.random() * 180;
        setTimeout(() => mountedRef.current && setBurstLevel(0), dur);
        scheduleBurst();
      }, delay);
    };
    scheduleBurst();

    // subtle constant micro-jitter
    containerControls.start({
      x: [0, 0.5, -0.4, 0.3, 0],
      transition: { duration: 0.18, repeat: Infinity, ease: "linear" },
    });

    const startTs = performance.now();
    const dur = 5200;
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - startTs;
      let p = (elapsed / dur) * 100;
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
      mountedRef.current = false;
      clearInterval(lineTimer);
      clearTimeout(burstTimeout);
      cancelAnimationFrame(raf);
    };
  }, [onDone, shakeControls, containerControls]);

  const burstClass =
    burstLevel === 2 ? "boot-glitching boot-glitching-heavy" : burstLevel === 1 ? "boot-glitching" : "";

  return (
    <motion.div
      animate={containerControls}
      className={`boot-screen ${fading ? "boot-fade" : ""} ${burstClass}`}
      role="dialog"
      aria-label="System boot"
    >
      {/* Static noise layer */}
      <div className="boot-noise" aria-hidden />
      {/* Rolling VHS band */}
      <div className="boot-vhs-band" aria-hidden />
      {/* CRT flicker */}
      <div className="boot-flicker" aria-hidden />

      {/* RGB split / tear slices */}
      <div className="boot-tear boot-tear-r" aria-hidden />
      <div className="boot-tear boot-tear-g" aria-hidden />
      <div className="boot-tear boot-tear-b" aria-hidden />
      <div className="boot-slice boot-slice-1" aria-hidden />
      <div className="boot-slice boot-slice-2" aria-hidden />
      <div className="boot-slice boot-slice-3" aria-hidden />
      <div className="boot-hjump" aria-hidden />

      <button onClick={onDone} className="boot-skip" aria-label="Skip intro">
        [ skip ] ESC
      </button>

      <motion.div
        animate={shakeControls}
        className="boot-inner"
        style={{ visibility: frameSkip ? "hidden" : "visible" }}
      >
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
            <span>{corruptPct ?? `${Math.floor(pct)}%`}</span>
          </div>
          <div className="boot-bar">
            <div className="boot-bar-fill" style={{ width: `${pct}%` }} />
            <div className="boot-bar-corrupt" aria-hidden />
          </div>
        </div>

        {granted && (
          <div className="boot-granted glitch" data-text="[ ACCESS GRANTED ]">
            [ ACCESS GRANTED ]
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
