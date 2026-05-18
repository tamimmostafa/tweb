# Plan: Buried Blueprint Portrait in Hero

## Goal
Place the uploaded blueprint-style face portrait next to the `tamim // mostafa` headline. It should feel **buried in the background** (faded, half-dissolving like sand/dust) and carry **glitch + scanline effects** that match the existing terminal aesthetic.

## Steps

1. **Add the image as an asset**
   - Copy `user-uploads://IMG_3224.PNG` → `src/assets/portrait-blueprint.png`
   - Import it in `src/routes/index.tsx`

2. **Restructure hero layout**
   - Current hero: text col-span-8 + terminal status card col-span-4
   - New hero: text col-span-7 + **portrait col-span-5** on desktop; status card moves below the text (or into a second row under the portrait) so the face sits directly beside the name
   - On mobile: portrait renders behind/under the headline at low opacity (decorative only)

3. **"Buried in sand" treatment** (pure CSS, no JS, no libs)
   - Low base opacity (~0.25–0.4), `mix-blend-mode: screen` so the white blueprint lines glow against the dark bg
   - Heavy mask: radial-gradient + repeating noise mask so the bottom + edges dissolve into the background (the "sand burial" effect)
   - Subtle `hue-rotate` toward the primary terminal green so it reads as part of the palette, not a photo
   - Slow `filter: blur()` breathing animation (4–6s loop) for a "shifting dust" feel

4. **Glitch layer**
   - Reuse the existing `.glitch` pattern: stack 2 duplicate `<img>` layers with `clip-path` slices and small `translate` offsets, animated on a 3–5s loop
   - Add RGB-split via two copies with `mix-blend-mode: screen` tinted with `drop-shadow` in primary + a magenta-ish complement
   - Occasional "tear" keyframe (every ~7s) shifting one slice harder

5. **Extra ambient effects (lightweight)**
   - Scanline overlay (`repeating-linear-gradient`) on top of the portrait only
   - Faint vertical "data column" lines drifting down across the portrait (CSS gradient + `background-position` animation) — evokes the matrix feel without re-adding MatrixRain
   - One small `[ scanning… ]` mono label floating at the corner of the portrait that re-types every few seconds (reuse existing `Typewriter`)

6. **Performance + a11y**
   - Image marked `aria-hidden`, `alt=""` (decorative)
   - All animations gated behind `@media (prefers-reduced-motion: no-preference)`
   - No new dependencies, no 3D libs — stays light

## Files touched
- `src/assets/portrait-blueprint.png` (new, copied from upload)
- `src/routes/index.tsx` (hero JSX restructure + portrait component)
- `src/styles.css` (mask, glitch-image, scanline, dust keyframes)

## What it will feel like
The face sits behind/beside the name like a faded architectural blueprint half-eroded into the terminal background — readable on close look, ghostly at a glance, with quiet RGB tears and scanlines giving it life without competing with the headline.
