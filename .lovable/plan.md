## Plan: Simplify portfolio + real info refresh

Keep the existing monochrome terminal look (typography, spacing, cards, glow, cursor). Only content, section list, skills structure, and background are changing.

### Section list (final order)
1. Hero
2. About (`whoami`)
3. Skills (restructured into 3 groups)
4. Projects (1 placeholder card for now)
5. Certs (DECI L1 + L2, unchanged)
6. Contact (links only — no form)

Removed: CTF scoreboard, contact message form.

### Hero
- Keep title `tamim // mostafa`, role typewriter, bio line, status terminal card.
- Remove `<MatrixRain />`. Replace with a lightweight ambient layer: animated CSS radial gradient + existing grid + slow-drifting subtle noise (pure CSS, no canvas, no JS). No 3D — keeps the page light and avoids dependency weight (three.js would add ~600KB and hurt mobile).

### About
- Unchanged content and layout.

### Skills — restructured into 3 groups (2-col grid of group cards on desktop, stacked on mobile)
Each group is a terminal card with a header (`// languages & low-level`, etc.) and the skill rows with progress bars.

**1. Languages & low-level**
- Python 92
- JavaScript 80
- C++ 75
- PHP 68
- Binary / machine code / hex 78

**2. Networks & hardware**
- Network fundamentals 94
- Network analysis 85
- Hardware hacking 77
- Embedded systems 73
- Low-level debugging 71

**3. Technical communication**
- Documentation 91
- Verbal explanation 89
- Technical writing 84
- Simplification 81
- Knowledge sharing 79

### Projects
- One card only: `embedded-recon-board` (ESP32 wifi sniffer, current focus), links to `https://github.com/tamimmostafa`.
- Small caption above: `// more shipping soon`.

### Certs
- Unchanged (DECI Programming L1 + L2).

### Contact (links only, no form)
- github → `github.com/tamimmostafa` → `https://github.com/tamimmostafa`
- linkedin → `linkedin.com/in/tamimmostafa` → `https://linkedin.com/in/tamimmostafa`
- instagram → `instagram.com/tamimmostafaa` → `https://instagram.com/tamimmostafaa`
- mail → `support.tamim@gmail.com` → `mailto:support.tamim@gmail.com`

### Nav
- Update anchor list to: about, skills, projects, certs, contact (drop ctf).

### Footer
- Unchanged.

### Files touched
- `src/routes/index.tsx` — restructure skills into 3 groups, 1 project, new contacts (no form), drop CTF section, update nav anchors, remove `<MatrixRain />` import + usage.
- `src/styles.css` — add small `.ambient-glow` keyframes for the replacement background layer.
- `src/components/MatrixRain.tsx` — leave file in place but unused (safe to delete later if you want).

No new dependencies. No backend. No route changes.
