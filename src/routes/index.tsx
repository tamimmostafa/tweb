import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MatrixRain } from "@/components/MatrixRain";
import { Typewriter } from "@/components/Typewriter";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "kade.bin // Cybersecurity Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of a cybersecurity student — penetration testing, CTF player, ethical hacker. Projects, certifications, and CTF rankings.",
      },
      { property: "og:title", content: "kade.bin // Cybersecurity Portfolio" },
      {
        property: "og:description",
        content: "Cybersecurity student · Ethical Hacker · CTF Player",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
});

const skills = [
  { name: "Network Security", level: 88 },
  { name: "Penetration Testing", level: 82 },
  { name: "Python", level: 90 },
  { name: "Linux / Bash", level: 92 },
  { name: "OSINT", level: 78 },
  { name: "Cryptography", level: 70 },
  { name: "Malware Analysis", level: 65 },
  { name: "Web Exploitation", level: 84 },
];

const projects = [
  {
    name: "subhound",
    desc: "Async subdomain enumeration tool combining passive sources (crt.sh, AlienVault) with permutation bruteforce. Outputs JSON + interactive HTML report.",
    tags: ["Python", "asyncio", "Recon"],
    href: "#",
  },
  {
    name: "CVE-2024-XXXX writeup",
    desc: "Reproduction and exploit walkthrough of an authenticated RCE in a popular self-hosted dashboard. Includes patched diff analysis.",
    tags: ["CVE", "RCE", "Disclosure"],
    href: "#",
  },
  {
    name: "shellcrypt",
    desc: "Educational reverse shell payload encoder with AES + XOR layering. Built to study AV/EDR signature evasion in a lab environment.",
    tags: ["Python", "Malware Lab", "Kali"],
    href: "#",
  },
  {
    name: "ctf-toolkit",
    desc: "Personal CLI of go-to scripts for CTFs: hash detection, JWT cracking, padding-oracle helpers, steg utils. Used across HTB & PicoCTF.",
    tags: ["CTF", "CLI", "Crypto"],
    href: "#",
  },
];

const certs = [
  { name: "CompTIA Security+", code: "SY0-701", year: "2025" },
  { name: "eJPT", code: "v2", year: "2025" },
  { name: "CEH (in progress)", code: "v13", year: "2026" },
  { name: "TryHackMe", code: "Top 1%", year: "Ongoing" },
];

const ctfs = [
  { platform: "HackTheBox", rank: "Pro Hacker", solved: 142, score: 1820 },
  { platform: "TryHackMe", rank: "Top 1%", solved: 218, score: 9460 },
  { platform: "PicoCTF 2024", rank: "#312 / 18k", solved: 47, score: 8350 },
  { platform: "CTFtime (team)", rank: "Local Top 10", solved: 31, score: 4120 },
];

function NavBar() {
  const [t, setT] = useState("");
  useEffect(() => {
    const i = setInterval(() => {
      const d = new Date();
      setT(d.toUTCString().split(" ")[4] + " UTC");
    }, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_85%,transparent)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 font-mono text-xs">
        <a href="#top" className="text-foreground hover-flicker">
          <span className="text-[var(--primary)]">~/</span>kade.bin
        </a>
        <nav className="hidden gap-6 md:flex">
          {[
            ["about", "#about"],
            ["skills", "#skills"],
            ["projects", "#projects"],
            ["certs", "#certs"],
            ["ctf", "#ctf"],
            ["contact", "#contact"],
          ].map(([n, h]) => (
            <a key={n} href={h} className="text-muted-foreground hover-flicker">
              ./{n}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 text-muted-foreground sm:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--primary)] accent-glow" />
          <span>{t || "--:--:-- UTC"}</span>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="reveal mb-10">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--primary)]">
        // {tag}
      </div>
      <h2 className="font-mono text-3xl font-bold md:text-5xl">
        <span className="text-muted-foreground">$</span> {title}
        <span className="cursor-blink" />
      </h2>
      <hr className="divider-dotted mt-6" />
    </div>
  );
}

function Index() {
  useReveal();

  return (
    <div id="top" className="min-h-screen font-sans">
      <NavBar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0">
          <MatrixRain />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/30 via-[var(--background)]/70 to-[var(--background)]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--primary)]">
              [ access_granted ] — node 0x7F
            </div>
            <h1
              className="glitch mt-6 font-mono text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl"
              data-text="kade // hossain"
            >
              kade <span className="text-[var(--primary)] text-accent-glow">//</span> hossain
            </h1>

            <div className="mt-8 font-mono text-lg text-foreground md:text-2xl">
              <span className="text-muted-foreground">&gt; role:</span>{" "}
              <Typewriter
                words={[
                  "Cybersecurity Student",
                  "Ethical Hacker",
                  "CTF Player",
                  "Red Team Apprentice",
                ]}
                className="text-[var(--primary)] text-accent-glow"
              />
            </div>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Final-year cybersecurity student focused on offensive security,
              network defense, and breaking things ethically. I document every
              hack, ship open-source tools, and live in the terminal.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 border border-[var(--primary)] bg-[var(--primary)]/10 px-5 py-3 font-mono text-sm text-[var(--primary)] accent-glow transition hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
              >
                <span>./view_projects</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border border-[var(--border)] px-5 py-3 font-mono text-sm text-foreground transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <span>cat contact.txt</span>
              </a>
            </div>
          </div>

          <aside className="md:col-span-4">
            <div className="terminal-card font-mono text-xs">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]/70" />
                <span className="ml-2 text-muted-foreground">~/status</span>
              </div>
              <pre className="whitespace-pre-wrap p-4 leading-relaxed text-foreground">
{`> uptime
  studying: 4y 2mo
> currently
  hunting bugs · grinding HTB
> reading
  "The Web Application Hacker's Handbook"
> coffee
  ████████░░ 80%`}
                <span className="cursor-blink" />
              </pre>
            </div>
          </aside>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_01" title="whoami" />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="reveal md:col-span-7">
              <p className="text-lg leading-relaxed text-foreground">
                I'm a cybersecurity student passionate about{" "}
                <span className="text-[var(--primary)]">offensive security</span>,
                low-level systems, and the moment a payload finally returns a
                shell. My focus is on bridging theory with hands-on exploitation
                — from CVE reproduction to full lab pivots.
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Outside of coursework, I run a homelab with vulnerable VMs,
                contribute writeups, and play CTFs solo and with my university
                team. I believe good security is built by people who actually
                understand how systems break.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  ["yrs studying", "4+"],
                  ["ctfs played", "60+"],
                  ["repos shipped", "23"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="terminal-card p-4 font-mono"
                  >
                    <div className="text-3xl font-bold text-[var(--primary)]">
                      {v}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {k}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal md:col-span-5">
              <div className="terminal-card font-mono text-xs">
                <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)] accent-glow" />
                  bash — kade@archlinux: ~
                </div>
                <pre className="whitespace-pre-wrap p-4 leading-relaxed">
<span className="text-[var(--primary)]">$ </span>whoami{"\n"}
kade — cybersec student, breaker of things{"\n\n"}
<span className="text-[var(--primary)]">$ </span>skills --list{"\n"}
[+] offensive security{"\n"}
[+] network analysis{"\n"}
[+] python tooling{"\n"}
[+] linux internals{"\n\n"}
<span className="text-[var(--primary)]">$ </span>status{"\n"}
<span className="text-[var(--primary)]">→ learning, always.</span>
                  <span className="cursor-blink" />
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_02" title="skills --list" />

          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name} className="reveal font-mono">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-foreground">{s.name}</span>
                  <span className="text-[var(--primary)]">{s.level}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                  <div
                    className="h-full bg-[var(--primary)]"
                    style={{
                      width: `${s.level}%`,
                      boxShadow: "0 0 12px var(--primary)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_03" title="ls ./projects" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="reveal group terminal-card relative block overflow-hidden p-6 transition hover:border-[var(--primary)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="glitch font-mono text-xl font-bold"
                    data-text={p.name}
                  >
                    <span className="text-[var(--primary)]">$</span> {p.name}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground transition group-hover:text-[var(--primary)]">
                    [ git ↗ ]
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-[var(--border)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/80 group-hover:border-[var(--primary)]/50 group-hover:text-[var(--primary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CERTS */}
      <section id="certs" className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_04" title="cat certs.log" />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {certs.map((c) => (
              <div
                key={c.name}
                className="reveal terminal-card flex flex-col items-center p-6 text-center transition hover:border-[var(--primary)]"
              >
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rotate-45 border border-[var(--primary)]/60" />
                  <div className="absolute inset-2 rotate-45 border border-[var(--primary)]/30" />
                  <span className="font-mono text-[10px] tracking-widest text-[var(--primary)]">
                    {c.year}
                  </span>
                </div>
                <div className="font-mono text-sm font-semibold">{c.name}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {c.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTF */}
      <section id="ctf" className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_05" title="./scoreboard --ctf" />

          <div className="reveal terminal-card overflow-hidden">
            <div className="grid grid-cols-12 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <div className="col-span-5">platform</div>
              <div className="col-span-3">rank</div>
              <div className="col-span-2 text-right">solved</div>
              <div className="col-span-2 text-right">score</div>
            </div>
            {ctfs.map((c, i) => (
              <div
                key={c.platform}
                className="grid grid-cols-12 items-center border-b border-[var(--border)] px-4 py-4 font-mono text-sm last:border-0 transition hover:bg-[var(--surface-2)]"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <span className="text-[var(--primary)]">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span>{c.platform}</span>
                </div>
                <div className="col-span-3 text-foreground/80">{c.rank}</div>
                <div className="col-span-2 text-right text-[var(--primary)]">
                  {c.solved}
                </div>
                <div className="col-span-2 text-right">{c.score.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_06" title="./connect" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="reveal md:col-span-7">
              <div className="terminal-card p-6 font-mono text-sm">
                <div className="space-y-3">
                  {[
                    ["github", "github.com/kade-sec", "https://github.com"],
                    ["linkedin", "linkedin.com/in/kade-sec", "https://linkedin.com"],
                    ["mail", "kade@protonmail.com", "mailto:kade@protonmail.com"],
                    ["pgp", "0xDEAD BEEF 1337 CAFE", "#"],
                  ].map(([k, v, h]) => (
                    <a
                      key={k}
                      href={h}
                      className="group flex items-center justify-between gap-4 border-b border-[var(--border)] py-2 last:border-0"
                    >
                      <span className="text-muted-foreground">
                        <span className="text-[var(--primary)]">$</span> open --{k}
                      </span>
                      <span className="hover-flicker text-foreground group-hover:text-[var(--primary)]">
                        {v} <span className="opacity-60">↗</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal md:col-span-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.currentTarget as HTMLFormElement;
                  f.reset();
                  alert("> message queued. response ETA: <24h");
                }}
                className="terminal-card space-y-4 p-6 font-mono text-sm"
              >
                <div>
                  <label className="text-xs text-muted-foreground">
                    <span className="text-[var(--primary)]">$</span> --from
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@domain.tld"
                    className="mt-1 w-full border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    <span className="text-[var(--primary)]">$</span> --message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="payload..."
                    className="mt-1 w-full border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 border border-[var(--primary)] bg-[var(--primary)]/10 px-4 py-2 text-[var(--primary)] accent-glow transition hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
                >
                  ./send_packet
                  <span className="transition group-hover:translate-x-1">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row">
          <div>
            © {new Date().getFullYear()} kade.bin · all packets reserved
          </div>
          <div>
            built in vim · deployed at 03:14 ·{" "}
            <span className="text-[var(--primary)]">connection: secure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
