// Tiny WebAudio synth-beep helper. No assets.
let ctx: AudioContext | null = null;
let enabled = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function setSfxEnabled(v: boolean) {
  enabled = v;
  if (typeof window !== "undefined") {
    localStorage.setItem("temo.sfx", v ? "1" : "0");
  }
  if (v) {
    const c = getCtx();
    if (c && c.state === "suspended") c.resume();
  }
}

export function isSfxEnabled() {
  if (typeof window === "undefined") return false;
  if (!enabled) {
    enabled = localStorage.getItem("temo.sfx") === "1";
  }
  return enabled;
}

function beep(freq: number, duration = 0.05, type: OscillatorType = "square", gain = 0.04) {
  if (!isSfxEnabled()) return;
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration);
}

export const sfx = {
  tick: () => beep(880 + Math.random() * 200, 0.025, "square", 0.025),
  hover: () => beep(540, 0.04, "sine", 0.03),
  click: () => beep(220, 0.08, "triangle", 0.05),
  success: () => {
    beep(660, 0.08, "sine", 0.05);
    setTimeout(() => beep(990, 0.12, "sine", 0.05), 90);
  },
};
