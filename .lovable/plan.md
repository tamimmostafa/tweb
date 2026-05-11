## Plan: Rebuild portfolio with Tamim's real content + monochrome accent

### Identity & roles
- Name: **Tamim Mostafa** / handle **temo.bash**
- Roles cycled in hero typewriter:
  - Student Ethical Hacker
  - Red Team Apprentice
  - Penetration Tester
- Update nav brand from `~/kade.bin` → `~/temo.bash`
- Update page `<title>` and meta to "temo.bash // Tamim Mostafa — Cybersecurity Portfolio"
- Update footer copyright to `temo.bash`

### Accent: white-only monochrome
- In `src/styles.css`, change `--primary` token from electric green to pure off-white (e.g. `oklch(0.98 0 0)`) and `--primary-foreground` to deep black.
- Soften the `accent-glow` / `text-accent-glow` shadows from green to a subtle white glow (low-opacity white box-shadow / text-shadow) so the glow still reads but stays monochrome.
- Matrix rain characters: switch from green to white at slightly reduced opacity so the hero doesn't get overwhelmed.
- Cursor blink, primary borders, progress bars, status dot, hero CTA, certs diamonds, all `[var(--primary)]` references stay as-is structurally — they automatically become white via the token swap.

### HERO
- Title: `tamim // mostafa` (with `//` in primary white)
- Subtitle line: `> role:` + typewriter cycling the 3 roles above
- Bio paragraph (short version of provided bio):
  > Self-taught cybersecurity enthusiast with 3+ years of hands-on learning. Focused on penetration testing, red team ops, and now diving into embedded systems to understand security at the hardware level.
- Status terminal card (right column):
  ```
  > uptime
    studying: 3y+
  > currently
    embedded recon · esp32 wifi sniffer
  > reading
    "Penetration Testing" — Georgia Weidman
  > ctfs
    0 played · ramping up
  ```

### ABOUT (`whoami`)
- Two paragraphs from provided bio (full version, lightly tightened).
- Stats cards: `3+ yrs studying`, `0 ctfs played`, `soon repos shipped`.
- Right column terminal: keep the bash session, swap content to reference Tamim's actual focus (offensive security, embedded, python, linux internals).

### SKILLS
Replace skills array with the 10 provided (Network Security 85, Python 90, Linux 88, Web Hacking 80, OSINT 75, Kali Linux 85, Metasploit 70, Burp Suite 72, Active Directory 65, Embedded Systems 60). Two-column grid auto-fits 10.

### PROJECTS
Replace 4 placeholder projects with the 4 provided (NetRecon, PhishKit Detector, AD Lab Setup, Embedded Recon Board) — each links to `https://github.com/tamimmostafa`. Add a small "// placeholder — real repos coming soon" caption above the grid so it's transparent.

### CERTS
Replace cert tiles with the 2 DECI certs:
- DECI Programming Level 1 / DECI-L1
- DECI Programming Level 2 / DECI-L2
Year on the diamond becomes a `—` glyph (no year provided).
Grid stays 2 cols on mobile / centers on desktop (4-col grid with 2 items left-aligned, or change to `md:grid-cols-2` and constrain max width so 2 tiles look intentional, not sparse).

### CTF section
User has none yet. Two options shown earlier; default to:
- Keep the section (titled `./scoreboard --ctf`) but replace the table with an empty-state terminal card:
  ```
  $ ./scoreboard --ctf
  > no entries yet.
  > status: training in homelab.
  > eta: first ctf submission soon █
  ```
- This keeps the 6-section flow and nav anchor working.

### CONTACT
Replace the 4 contact rows with real links:
- github → `github.com/tamimmostafa` → `https://github.com/tamimmostafa`
- linkedin → `linkedin.com/in/tamimmostafa` → `https://linkedin.com/in/tamimmostafa`
- mail → `support.tamim@gmail.com` → `mailto:support.tamim@gmail.com`
- Drop the PGP row (no key provided) — keep just 3 rows so it doesn't feel padded.
Keep the message form as-is (client-only, alert on submit).

### Footer
`© 2026 temo.bash · all packets reserved` · `built in vim · connection: secure`

### Files touched
- `src/routes/index.tsx` — content + brand rewrite
- `src/styles.css` — `--primary` + glow tokens to monochrome white
- `src/components/MatrixRain.tsx` — char color → white/low-opacity

No new dependencies. No backend. No route changes.
