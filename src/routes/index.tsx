import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Typewriter } from "@/components/Typewriter";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "temo.bash // Tamim Mostafa — Cybersecurity Portfolio" },
      {
        name: "description",
        content:
          "Tamim Mostafa (temo.bash) — self-taught cybersecurity enthusiast. Penetration testing, red team apprentice, embedded security research.",
      },
      { property: "og:title", content: "temo.bash // Tamim Mostafa" },
      {
        property: "og:description",
        content: "Student Ethical Hacker · Red Team Apprentice · Penetration Tester",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
});

type Skill = { name: string; level: number };
type SkillGroup = { tag: string; title: string; items: Skill[] };

const skillGroups: SkillGroup[] = [
  {
    tag: "grp_01",
    title: "languages & low-level",
    items: [
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 80 },
      { name: "C++", level: 75 },
      { name: "PHP", level: 68 },
      { name: "Binary / machine code / hex", level: 78 },
    ],
  },
  {
    tag: "grp_02",
    title: "networks & hardware",
    items: [
      { name: "Network fundamentals", level: 94 },
      { name: "Network analysis", level: 85 },
      { name: "Hardware hacking", level: 77 },
      { name: "Embedded systems", level: 73 },
      { name: "Low-level debugging", level: 71 },
    ],
  },
  {
    tag: "grp_03",
    title: "technical communication",
    items: [
      { name: "Documentation", level: 91 },
      { name: "Verbal explanation", level: 89 },
      { name: "Technical writing", level: 84 },
      { name: "Simplification", level: 81 },
      { name: "Knowledge sharing", level: 79 },
    ],
  },
];

const projects = [
  {
    name: "embedded-recon-board",
    desc: "ESP32-based Wi-Fi probe sniffer for passive network recon research. Firmware in C++, captures probe requests for analysis. Current focus.",
    tags: ["Embedded", "C++", "ESP32", "RF"],
    href: "https://github.com/tamimmostafa",
  },
];

const certs = [
  { name: "DECI Programming L1", code: "DECI-L1" },
  { name: "DECI Programming L2", code: "DECI-L2" },
];

const contacts: [string, string, string][] = [
  ["github", "github.com/tamimmostafa", "https://github.com/tamimmostafa"],
  ["linkedin", "linkedin.com/in/tamimmostafa", "https://linkedin.com/in/tamimmostafa"],
  ["instagram", "instagram.com/tamimmostafaa", "https://instagram.com/tamimmostafaa"],
  ["mail", "support.tamim@gmail.com", "mailto:support.tamim@gmail.com"],
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
          <span className="text-[var(--primary)]">~/</span>temo.bash
        </a>
        <nav className="hidden gap-6 md:flex">
          {[
            ["about", "#about"],
            ["skills", "#skills"],
            ["projects", "#projects"],
            ["certs", "#certs"],
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
        {tag}
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="ambient-orb ambient-orb-a" />
          <div className="ambient-orb ambient-orb-b" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/40 to-[var(--background)]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--primary)]">
              [ access_granted ] — node 0x7F
            </div>
            <h1
              className="glitch mt-6 font-mono text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl"
              data-text="tamim // mostafa"
            >
              tamim <span className="text-[var(--primary)] text-accent-glow">//</span> mostafa
            </h1>

            <div className="mt-8 font-mono text-lg text-foreground md:text-2xl">
              <span className="text-muted-foreground">&gt; role:</span>{" "}
              <Typewriter
                words={[
                  "Student Ethical Hacker",
                  "Red Team Apprentice",
                  "Penetration Tester",
                ]}
                className="text-[var(--primary)] text-accent-glow"
              />
            </div>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Self-taught cybersecurity enthusiast with 3+ years of hands-on
              learning. Focused on penetration testing and red team ops — now
              diving into embedded systems to understand security at the
              hardware level.
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
  studying: 3y+
> currently
  embedded recon · esp32 wifi sniffer
> reading
  "Penetration Testing" — G. Weidman
> ctfs
  0 played · ramping up`}
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
                I'm Tamim Mostafa, a self-taught cybersecurity enthusiast with
                3+ years of hands-on learning. I focus on{" "}
                <span className="text-[var(--primary)]">penetration testing</span>{" "}
                and red team operations — not because it was assigned to me, but
                because I genuinely love breaking things apart to understand how
                they work.
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Right now I'm diving deep into embedded systems, playing with
                microcontrollers and development boards to understand
                cybersecurity at the hardware level. I learn by building, by
                experimenting, and by going down rabbit holes at 2am. I'm not
                done learning — I'm just getting started.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  ["yrs studying", "3+"],
                  ["ctfs played", "0"],
                  ["repos shipped", "soon"],
                ].map(([k, v]) => (
                  <div key={k} className="terminal-card p-4 font-mono">
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
                  bash — temo@kali: ~
                </div>
                <pre className="whitespace-pre-wrap p-4 leading-relaxed">
<span className="text-[var(--primary)]">$ </span>whoami{"\n"}
tamim — self-taught, breaker of things{"\n\n"}
<span className="text-[var(--primary)]">$ </span>focus --list{"\n"}
[+] offensive security{"\n"}
[+] red team apprentice{"\n"}
[+] embedded / hardware sec{"\n"}
[+] python tooling{"\n\n"}
<span className="text-[var(--primary)]">$ </span>status{"\n"}
<span className="text-[var(--primary)]">→ just getting started.</span>
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.tag} className="reveal terminal-card p-6">
                <div className="mb-5 font-mono text-sm font-semibold text-[var(--primary)]">
                  {g.title}
                </div>
                <div className="space-y-4">
                  {g.items.map((s) => (
                    <div key={s.name} className="font-mono">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-[var(--primary)]">{s.level}%</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                        <div
                          className="h-full bg-[var(--primary)]"
                          style={{
                            width: `${s.level}%`,
                            boxShadow: "0 0 10px var(--primary)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
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
                target="_blank"
                rel="noreferrer"
                className="reveal group terminal-card relative block overflow-hidden p-6 transition hover:border-[var(--primary)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <h3 className="glitch font-mono text-xl font-bold" data-text={p.name}>
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

          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4">
            {certs.map((c) => (
              <div
                key={c.name}
                className="reveal terminal-card flex flex-col items-center p-6 text-center transition hover:border-[var(--primary)]"
              >
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rotate-45 border border-[var(--primary)]/60" />
                  <div className="absolute inset-2 rotate-45 border border-[var(--primary)]/30" />
                  <span className="font-mono text-[10px] tracking-widest text-[var(--primary)]">
                    —
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

      {/* CONTACT */}
      <section id="contact">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_05" title="./connect" />

          <div className="reveal mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="terminal-card p-6 font-mono text-sm">
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                // links
              </div>
              <div className="space-y-3">
                {contacts.map(([k, v, h]) => (
                  <a
                    key={k}
                    href={h}
                    target={h.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
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

            <TextMeForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} temo.bash · all packets reserved</div>
          <div>
            built in vim ·{" "}
            <span className="text-[var(--primary)]">connection: secure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const MY_EMAIL = "support.tamim@gmail.com";

function TextMeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const m = msg.trim();
    if (!n || n.length > 100) return setErr("name: 1–100 chars required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) || em.length > 255)
      return setErr("email: invalid format");
    if (!m || m.length > 2000) return setErr("message: 1–2000 chars required");
    setErr(null);

    const subject = `[temo.bash] message from ${n}`;
    const body = `${m}\n\n— ${n} <${em}>`;
    window.location.href = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputCls =
    "w-full border border-[var(--border)] bg-transparent px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--primary)] focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="terminal-card flex flex-col gap-3 p-6 font-mono text-sm"
      noValidate
    >
      <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        // ./text_me
      </div>
      <label className="text-xs text-muted-foreground">
        <span className="text-[var(--primary)]">$</span> name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
          className={`mt-1 ${inputCls}`}
          placeholder="who_are_you"
        />
      </label>
      <label className="text-xs text-muted-foreground">
        <span className="text-[var(--primary)]">$</span> email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          required
          className={`mt-1 ${inputCls}`}
          placeholder="you@domain.tld"
        />
      </label>
      <label className="text-xs text-muted-foreground">
        <span className="text-[var(--primary)]">$</span> message
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          maxLength={2000}
          required
          rows={4}
          className={`mt-1 resize-none ${inputCls}`}
          placeholder="what's on your mind?"
        />
      </label>
      {err && (
        <div className="text-xs text-[var(--primary)]">
          <span className="opacity-60">!</span> {err}
        </div>
      )}
      <button
        type="submit"
        className="group mt-1 inline-flex items-center justify-center gap-2 border border-[var(--primary)] bg-[var(--primary)]/10 px-4 py-2 text-sm text-[var(--primary)] accent-glow transition hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
      >
        <span>./send_mail</span>
        <span className="transition group-hover:translate-x-1">→</span>
      </button>
      <div className="text-[10px] text-muted-foreground/70">
        // opens your mail client · sends to {MY_EMAIL}
      </div>
    </form>
  );
}
