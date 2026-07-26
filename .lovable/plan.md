Plan: Professional & Humane Portfolio Rebuild

## Direction
Move from the current "terminal/hacker" aesthetic to a clean, editorial, dark portfolio that feels like a senior designer or engineer's personal site. Keep the black-and-white palette, keep the blueprint portrait, but strip out the glitch, buried-sand, typewriter, scramble, and sound effects. No extra "human touch" flourishes — the professionalism itself is the human touch.

## Visual system
- Color: Pure black and white only. No accent colors.
- Typography: Serif display face for headings (e.g., "DM Serif Display") + clean sans-serif for body (Inter) + JetBrains Mono for tiny technical labels only.
- Spacing: Generous whitespace, centered single-column reading, max-width reading container.
- Portrait: The blueprint portrait is shown clean, centered, with a soft white glow and no buried/sand/glitch effect. It sits to the left of the hero text on desktop.
- Scanlines: Keep a very subtle scanline overlay across the whole page as the only remaining effect.

## Loading experience
- Boot screen: Shorten to ~1.5–2 s. Show just "Tamim Mostafa" + a thin progress bar + "Loading portfolio…". Remove all the hacker-style log lines, stalls, and heavy glitch bursts. Keep a very subtle flicker only.
- Remove MatrixRain, SiteFX, SoundToggle, Scramble, Typewriter, and the `use-reveal` scroll fade-in.

## Navigation
- Minimal single-word nav: About, Work, Stack, Reach.
- Remove the live UTC clock and the "open to work" status badge.
- Keep the nav sticky with a blurred background.

## Section structure (4 sections)
1. **Hero**
   - Layout: portrait on left, text on right (desktop), stacked on mobile.
   - Clean full name, no glitch or scramble.
   - Static tagline: "Computer Engineering Student · Electronics Tinkerer · RF Curious".
   - One short sentence about your focus, followed by two CTAs: "View my work" and "Get in touch".
   - Remove the hero status card.

2. **About**
   - Single centered text block.
   - Use the full bio you gave (4 sentences), plus the "Currently" line: focused on microwave-band RF theory and building Yagi-Uda/log-periodic antennas.

3. **Work**
   - Clean minimal project cards with border, title, description, tags.
   - Merge the old RF Lab into Work as a dedicated RF project card.
   - Projects: Homemade Dipole Antenna, Athena, RF Lab / Listening Post.
   - No terminal window chrome.

4. **Stack**
   - Reduce skills to 4–5 core categories: Languages & Frameworks, Hardware & Embedded, RF & SDR, Networking & Security, AI & Tools.
   - Show each skill as a clean label with a simple proficiency bar.
   - Use the honest percentages you gave.

5. **Reach**
   - Real contact form with Name, Email, Subject, Message.
   - Backend: validate with Zod, store the submission in a Supabase `contact_submissions` table, and send an email via Resend to your email address (fallback to DB-only if no Resend key is configured yet).
   - Also include clean links to GitHub, LinkedIn, and email.

## Footer
- Minimal footer: "© 2026 Tamim Mostafa. Built by hand." centered at the bottom.

## Database
- Create a new `public.contact_submissions` table with GRANTs and RLS (anon cannot read, service_role can insert).
- Remove the unused `public.guestbook_entries` table and its policies.

## Backend
- Create `src/lib/contact.functions.ts` with a Zod-validated `createServerFn` that inserts into `contact_submissions` and calls Resend when `RESEND_API_KEY` is present.
- Add `src/lib/contact.schemas.ts` for the Zod schema shared by the form and server function.
- Add `sonner` toasts for success/error feedback.

## Cleanup
- Delete or stop using: `MatrixRain.tsx`, `SiteFX.tsx`, `SoundToggle.tsx`, `Typewriter.tsx`, `Scramble.tsx`, `src/lib/sfx.ts`, `src/hooks/use-reveal.ts`.
- Update `src/styles.css` to remove the heavy terminal/glitch animations, replace with the clean serif/sans typography, and keep only the subtle scanlines.
- Update `src/routes/__root.tsx` head metadata and load the new font families.
- Update `src/routes/index.tsx` to render the new 4-section layout.

## Open dependency
- Resend integration requires a `RESEND_API_KEY` secret. I will implement the backend so it gracefully falls back to DB-only if the key is not present; you can add the key later to enable email delivery.

## Files to edit
- `src/routes/index.tsx` (rewrite)
- `src/styles.css` (rewrite theme)
- `src/routes/__root.tsx` (head + fonts)
- `src/components/BootScreen.tsx` (shorten + clean)
- `src/lib/contact.functions.ts` (new)
- `src/lib/contact.schemas.ts` (new)
- Delete: `src/components/MatrixRain.tsx`, `src/components/SiteFX.tsx`, `src/components/SoundToggle.tsx`, `src/components/Typewriter.tsx`, `src/components/Scramble.tsx`, `src/lib/sfx.ts`, `src/hooks/use-reveal.ts`.

## Approval needed
If this plan looks right, approve it and I'll implement it. After implementation, I can also guide you through adding the Resend API key if you want emails to arrive in your inbox.