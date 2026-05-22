import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * Site-wide cinematic glitch overlay.
 * Subtle most of the time (scanlines + faint static + flicker),
 * with occasional short bursts (RGB tear, screen jump, horizontal tearing).
 * Pointer-events: none — never blocks UI.
 */
export function SiteFX() {
  const [burst, setBurst] = useState<0 | 1 | 2>(0);
  const [hjump, setHjump] = useState(false);
  const controls = useAnimationControls();
  const mountedRef = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    mountedRef.current = true;

    let timeoutId: ReturnType<typeof setTimeout>;
    const schedule = () => {
      // Bursts every 4–11s, mostly mild
      const delay = 4000 + Math.random() * 7000;
      timeoutId = setTimeout(() => {
        if (!mountedRef.current) return;
        const heavy = Math.random() < 0.28;
        setBurst(heavy ? 2 : 1);

        // vertical screen jump on heavy bursts
        if (heavy) {
          const jy = Math.random() * 10 - 5;
          const jx = Math.random() * 8 - 4;
          controls.start({
            x: [0, jx, -jx * 0.5, 0],
            y: [0, jy, -jy * 0.4, 0],
            transition: { duration: 0.28, ease: "easeInOut" },
          });
          setHjump(true);
          setTimeout(() => mountedRef.current && setHjump(false), 260);
        } else if (Math.random() < 0.5) {
          setHjump(true);
          setTimeout(() => mountedRef.current && setHjump(false), 160);
        }

        const dur = heavy ? 280 + Math.random() * 220 : 110 + Math.random() * 160;
        setTimeout(() => mountedRef.current && setBurst(0), dur);
        schedule();
      }, delay);
    };
    schedule();

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);
    };
  }, [controls]);

  const cls =
    burst === 2 ? "site-fx site-fx-burst site-fx-heavy" : burst === 1 ? "site-fx site-fx-burst" : "site-fx";

  return (
    <motion.div animate={controls} className={cls} aria-hidden>
      <div className="site-fx-noise" />
      <div className="site-fx-flicker" />
      <div className="site-fx-vhs" />
      <div className="site-fx-tear site-fx-tear-r" />
      <div className="site-fx-tear site-fx-tear-b" />
      {hjump && <div className="site-fx-hjump" />}
    </motion.div>
  );
}
