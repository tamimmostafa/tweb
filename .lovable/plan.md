Personalization Pass — make the site unmistakably Tamim's

## Ticker (replace generic frequencies)
Rotate three personal signals instead of RF bands:
- "Athena firmware — GitHub drop, Aug 19"
- "Fail again. Fail better."
- "Broadband dipole antenna — release this month"

Same brutalist marquee, same visual weight, just real content. Small mono "// SIGNAL" label instead of "// LIVE FEED".

## Projects
- Remove **RF Listening Post** entirely.
- Keep **Athena** and **Homemade Dipole Antenna** as equal cards (user said no hero spotlight).
- Add small "STATUS" chips on each card (e.g. Athena → "firmware v0.x · shipping Aug 19", Dipole → "release this month") so the cards echo the ticker.

## Suggested professional cleanups (all opt-in — you tell me yes/no per item before I build)
1. **Kill the live Cairo clock + pulsing dot in the top bar.** It's the same trope every dev portfolio uses. Replace with a single personal line, e.g. "Cairo · Computer Engineering · Class of 20XX".
2. **Rewrite the About paragraph** in first person, 3 short sentences, focused on: what you actually build (Athena, antennas), why (microwave RF mastery), and one honest line about where you are (student, learning in public). Drop buzzwords like "Red Team / Pentesting" unless you want them back.
3. **Stack section**: collapse to 3 groups instead of 5 — "Build" (C, Python, ESP-IDF, KiCad), "RF & Signal" (RTL-SDR, antenna design, SDR++), "Systems" (Linux, networking, Git). Fewer categories = looks intentional, not padded. Drop proficiency bars (everyone fakes them); replace with a plain comma list per group.
4. **Boot screen**: keep it, but replace "LOADING PORTFOLIO" with something specific like "TAMIM MOSTAFA · CAIRO" — no fake log lines.
5. **Reach section**: keep the form. Remove the "SEND A SIGNAL" giant black panel styling and match it to the rest of the page so it doesn't feel like a landing pad from a different site.
6. **Add a tiny "Now" strip** below the hero (1 line): "Right now: modeling a 2.4 GHz Yagi and finishing Athena's BLE scanner." Updateable in one place. This is the single most personal thing a portfolio can have.
7. **Footer**: replace "© 2026 Tamim Mostafa. Built by hand." with a signature line + last-updated date pulled from build time.

## Files touched
- `src/routes/index.tsx` — ticker content, remove Listening Post, project status chips, top bar rewrite, About rewrite, Stack collapse, Reach restyle, Now strip, footer
- `src/components/BootScreen.tsx` — label swap
- `src/styles.css` — only if Reach restyle needs it

## Decision needed from you
Reply with which of the 7 cleanups above you want (e.g. "1, 2, 3, 6, 7 yes; 4, 5 no"), and I'll build the whole pass in one go.
