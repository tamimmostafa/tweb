# Plan: Make temo.bash more exciting

## 1. Boot sequence intro (first load)
- Full-screen black overlay shown once per session (`sessionStorage` flag).
- Fake BIOS-style log lines stream in (`booting kernel...`, `mounting /dev/sda1`, `loading temo.bash modules`, `bypassing firewall`, `injecting payload`...).
- Progress bar fills to 100%, then a green `[ ACCESS GRANTED ]` flashes with a glitch + scanline effect, overlay fades out, hero reveals.
- Skip button (top-right) for repeat visitors / accessibility; respects `prefers-reduced-motion` (auto-skip).
- New file: `src/components/BootScreen.tsx`, mounted in `src/routes/index.tsx`.

## 2. Matrix rain background
- Already have `src/components/MatrixRain.tsx` (unused). Mount it as a fixed, low-opacity layer behind the hero only, masked to fade into the page.
- Pause when tab is hidden to save CPU.

## 3. Text scramble on hover
- New hook `src/hooks/use-scramble.ts` + small `Scramble` component.
- Apply to: nav links, section headings, project titles, "tamim // mostafa" hero name.
- Cycles random chars (`!<>-_\\/[]{}—=+*^?#`) for ~400ms then locks to the real text.

## 4. Sound FX toggle
- Tiny synthesized beeps via `WebAudio` (no asset files): keystroke tick on typewriter, soft hover blip on nav/buttons, success chime when boot completes.
- Floating mute/unmute button (bottom-right, fixed) with `localStorage` persistence. Defaults to OFF so the page never makes noise unprompted.
- New file: `src/lib/sfx.ts` + `src/components/SoundToggle.tsx`.

## 5. "Now / current mission" section
- New section between About and Skills.
- Terminal-card style: current focus (ESP32 recon board), what's being read, this week's goal, last-updated date.
- Static content in `src/routes/index.tsx` (no backend needed).

## 6. Guestbook / signal (Lovable Cloud)
- New section after Contact: `./guestbook` — visitors leave a short signed message.
- Requires enabling **Lovable Cloud** for storage.
- Table `guestbook_entries`: `id`, `handle` (1–32 chars), `message` (1–200 chars), `created_at`. RLS: public `insert` + public `select`.
- Form with Zod validation, rate-limit via simple client throttling + max length. Display latest ~20 entries as a scrolling terminal log.
- No auth required (anonymous sign with handle).

## Technical notes
- All new visual effects respect `prefers-reduced-motion`.
- Boot screen uses only CSS + a couple `setTimeout`s — no new deps.
- Sound uses Web Audio API — no audio assets, zero kb added.
- Scramble + sound are opt-in feeling: scramble only on hover, sound off by default.
- Files touched: `src/routes/index.tsx`, `src/styles.css`, plus new files listed above. No changes to routing/build config.

## Order of work
1. Boot screen + matrix rain
2. Scramble hook + apply to headings/nav
3. Sound toggle + WebAudio beeps
4. Now / current mission section
5. Enable Lovable Cloud → guestbook table + section