import { useEffect, useState } from "react";
import { isSfxEnabled, setSfxEnabled, sfx } from "@/lib/sfx";

export function SoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isSfxEnabled());
  }, []);

  const toggle = () => {
    const next = !on;
    setSfxEnabled(next);
    setOn(next);
    if (next) sfx.success();
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute sound effects" : "Enable sound effects"}
      className="fixed bottom-4 right-4 z-30 border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:border-[var(--primary)] hover:text-[var(--primary)] transition"
    >
      <span className="text-[var(--primary)]">{on ? "♪" : "×"}</span> sfx:{on ? "on" : "off"}
    </button>
  );
}
