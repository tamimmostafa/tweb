import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Typewriter } from "@/components/Typewriter";
import { Scramble } from "@/components/Scramble";
import { BootScreen } from "@/components/BootScreen";
import { SoundToggle } from "@/components/SoundToggle";
import { SiteFX } from "@/components/SiteFX";
import { MatrixRain } from "@/components/MatrixRain";
import { useReveal } from "@/hooks/use-reveal";
import portraitBlueprint from "@/assets/portrait-blueprint.png";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tamim Mostafa — Computer Engineering · RF · AI · Security" },
      {
        name: "description",
        content:
          "Tamim Mostafa — Computer Engineering student in Cairo. Building at the intersection of electronics, RF, artificial intelligence, and cybersecurity.",
      },
      { property: "og:title", content: "Tamim Mostafa — CE · RF · AI · Security" },
      {
        property: "og:description",
        content:
          "Computer Engineering Student | Electronics • RF • AI • Security. Currently building Athena and learning microwave RF.",
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

// proficiency scale: learning 40 · beginner 30 · working 65 · comfortable 80 · mastered 95
const skillGroups: SkillGroup[] = [
  {
    tag: "grp_01",
    title: "languages & low-level",
    items: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "C++", level: 78 },
      { name: "PHP", level: 60 },
      { name: "Binary / machine code / hex", level: 35 },
    ],
  },
  {
    tag: "grp_02",
    title: "networking",
    items: [
      { name: "TCP/IP fundamentals", level: 65 },
      { name: "DNS · DHCP · HTTP/S", level: 65 },
      { name: "Wireshark packet analysis", level: 65 },
      { name: "Linux networking", level: 65 },
      { name: "Firewall & routing", level: 95 },
      { name: "Network troubleshooting", level: 65 },
    ],
  },
  {
    tag: "grp_03",
    title: "hardware & embedded",
    items: [
      { name: "Basic electronics", level: 95 },
      { name: "PC building & diagnostics", level: 80 },
      { name: "Soldering", level: 65 },
      { name: "ESP32 / Arduino", level: 65 },
      { name: "Reading schematics", level: 65 },
    ],
  },
  {
    tag: "grp_04",
    title: "rf",
    items: [
      { name: "Antenna fundamentals", level: 95 },
      { name: "SDR & software integration", level: 65 },
      { name: "Signal ID / spectrum recon", level: 65 },
      { name: "Airband listening", level: 65 },
      { name: "ADS-B reception", level: 65 },
      { name: "RF connections & components", level: 65 },
      { name: "RF theory", level: 40 },
      { name: "RF transmission", level: 15 },
    ],
  },
  {
    tag: "grp_05",
    title: "security",
    items: [
      { name: "Linux security fundamentals", level: 95 },
      { name: "Web application security", level: 80 },
      { name: "Network security", level: 80 },
      { name: "Nmap", level: 80 },
      { name: "Burp Suite", level: 65 },
      { name: "Metasploit", level: 65 },
      { name: "Reverse engineering", level: 40 },
    ],
  },
  {
    tag: "grp_06",
    title: "ai",
    items: [
      { name: "LLM applications", level: 80 },
      { name: "Prompt engineering", level: 80 },
      { name: "AI-assisted development", level: 80 },
      { name: "AI agents & automation", level: 65 },
      { name: "Local LLMs", level: 65 },
      { name: "Python for AI", level: 65 },
      { name: "AI security / adversarial AI", level: 40 },
    ],
  },
  {
    tag: "grp_07",
    title: "tools",
    items: [
      { name: "Linux CLI", level: 95 },
      { name: "Git & GitHub", level: 80 },
      { name: "VS Code", level: 80 },
      { name: "SDR++", level: 80 },
      { name: "Docker", level: 65 },
      { name: "Postman", level: 65 },
      { name: "Figma", level: 30 },
    ],
  },
];

const projects = [
  {
    name: "homemade-dipole-antenna",
    desc: "A multi-band dipole tuned to receive roughly 70–300 MHz. Built with LMR-240 feedline, two telescopic elements, and a full RF front-end: bias tee, gain amplifier, and FM band-stop filter. Done and working on the bench.",
    tags: ["RF", "Dipole", "LMR-240", "Bias Tee", "LNA", "FM Notch"],
    status: "done · working",
    href: "https://github.com/tamimmostafa",
  },
  {
    name: "athena",
    desc: "ESP32-based multitool that can trace, transmit, attack, and scan across several RF stacks. Sub-GHz via CC1101, 2.4 GHz via nRF24, LoRa via SX1276, plus GPS, microSD, and a 2.8\" TFT UI. Mobile enclosure and battery integration under active development.",
    tags: ["ESP32-S3", "CC1101", "nRF24", "SX1276 LoRa", "GPS", "TFT"],
    status: "75% · in progress",
    href: "https://github.com/tamimmostafa",
  },
];

const contacts: [string, string, string][] = [
  ["github", "github.com/tamimmostafa", "https://github.com/tamimmostafa"],
  ["linkedin", "linkedin.com/in/tamimmostafa", "https://linkedin.com/in/tamimmostafa"],
  ["instagram", "instagram.com/tamimmostafaa", "https://instagram.com/tamimmostafaa"],
  ["mail", "support.tamim@gmail.com", "mailto:support.tamim@gmail.com"],
];

const rfTargets: [string, string][] = [
  ["Airband", "118–136 MHz AM"],
  ["VOR / NAV", "108–118 MHz"],
  ["Amateur 2m", "144–148 MHz"],
  ["Marine VHF", "156–162 MHz"],
  ["PMR446", "446 MHz"],
  ["FRS / GMRS", "462–467 MHz"],
  ["DMR", "digital voice"],
  ["TETRA", "trunked digital"],
  ["LoRa", "433 / 868 / 915 MHz"],
  ["ADS-B", "1090 MHz"],
  ["APRS", "144.800 MHz"],
  ["+ more", "scanning across RF"],
];

function LastSync() {
  const [s, setS] = useState("");
  useEffect(() => {
    setS(new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }));
  }, []);
  return <span>{s}</span>;
}

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
          <span className="text-[var(--primary)]">~/</span>tamim
        </a>
        <nav className="hidden gap-6 md:flex">
          {[
            ["about", "#about"],
            ["now", "#now"],
            ["skills", "#skills"],
            ["projects", "#projects"],
            ["rf", "#rf"],
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
        <span className="text-muted-foreground">$</span>{" "}
        <Scramble text={title} trigger="view" />
        <span className="cursor-blink" />
      </h2>
      <hr className="divider-dotted mt-6" />
    </div>
  );
}

function Index() {
  useReveal();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("temo.booted") === "1") {
      setBooted(true);
    }
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem("temo.booted", "1");
    setBooted(true);
  };

  return (
    <div id="top" className="min-h-screen font-sans">
      {!booted && <BootScreen onDone={finishBoot} />}
      <SoundToggle />
      <SiteFX />

      <NavBar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 pointer-events-none">
          <MatrixRain />
          <div className="ambient-orb ambient-orb-a" />
          <div className="ambient-orb ambient-orb-b" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/40 to-[var(--background)]" />
        </div>


        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-7">
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--primary)]">
              [ access_granted ] — Cairo, EG · open to work
            </div>
            <h1
              className="glitch mt-6 font-mono text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl"
              data-text="tamim // mostafa"
            >
              <Scramble text="tamim" trigger="mount" duration={700} />{" "}
              <span className="text-[var(--primary)] text-accent-glow">//</span>{" "}
              <Scramble text="mostafa" trigger="mount" duration={900} />
            </h1>

            <div className="mt-8 font-mono text-lg text-foreground md:text-2xl">
              <span className="text-muted-foreground">&gt; role:</span>{" "}
              <Typewriter
                words={[
                  "Computer Engineering Student",
                  "Electronics Tinkerer",
                  "RF Explorer",
                  "AI Builder",
                  "Security Learner",
                ]}
                className="text-[var(--primary)] text-accent-glow"
              />
            </div>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              I'm a computer engineering student with a strong interest in
              cybersecurity, artificial intelligence, embedded systems, and
              electronics. I enjoy building projects that combine hardware and
              software, and I'm always exploring how complex systems work — from
              RF communications to low-level programming. My goal is to develop
              secure, intelligent technologies that solve real-world problems.
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

          <aside className="md:col-span-5">
            <BuriedPortrait />
          </aside>

          <aside className="md:col-span-12">
            <div className="terminal-card font-mono text-xs">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]/70" />
                <span className="ml-2 text-muted-foreground">~/status</span>
              </div>
              <pre className="whitespace-pre-wrap p-4 leading-relaxed text-foreground">
{`> location
  cairo, egypt · open to opportunities
> currently
  athena (esp32 multitool) · microwave RF · yagi-uda / log-periodic design
> stack
  python · javascript · c++ · esp32 · sdr · linux
> mode
  building, breaking, learning — in that order`}
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
                I'm Tamim Mostafa, a computer engineering student based in
                Cairo. My interests sit at the intersection of{" "}
                <span className="text-[var(--primary)]">electronics, RF,
                AI, and security</span> — the parts of the stack where hardware
                and software meet.
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                I like taking systems apart to see how they actually work. I
                build my own antennas, design little embedded tools, poke at
                LLMs, and read a lot about protocols nobody thinks about
                anymore. The end goal is to build secure, intelligent
                technology that solves real problems — not just demos.
              </p>
            </div>

            <div className="reveal md:col-span-5">
              <div className="terminal-card font-mono text-xs">
                <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)] accent-glow" />
                  bash — tamim@lab: ~
                </div>
                <pre className="whitespace-pre-wrap p-4 leading-relaxed">
<span className="text-[var(--primary)]">$ </span>whoami{"\n"}
tamim mostafa — ce student, hardware+software{"\n\n"}
<span className="text-[var(--primary)]">$ </span>focus --list{"\n"}
[+] electronics & embedded{"\n"}
[+] rf / sdr / antennas{"\n"}
[+] ai / llms / agents{"\n"}
[+] cybersecurity{"\n\n"}
<span className="text-[var(--primary)]">$ </span>status{"\n"}
<span className="text-[var(--primary)]">→ building the next thing.</span>
                  <span className="cursor-blink" />
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOW */}
      <section id="now" className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_01b" title="cat ./now.log" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="reveal terminal-card p-6 md:col-span-2">
              <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)] accent-glow" />
                current mission
              </div>
              <div className="font-mono text-xl text-foreground">
                <span className="text-[var(--primary)]">›</span> advanced RF · microwave band
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Digging into microwave-band theory and designing a directional
                antenna setup — Yagi-Uda and log-periodic geometries — to push
                receive performance higher and get closer to controlled
                transmission.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="border border-[var(--border)] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">focus</div>
                  <div className="mt-1 text-foreground">Yagi-Uda · Log-periodic</div>
                </div>
                <div className="border border-[var(--border)] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">band</div>
                  <div className="mt-1 text-[var(--primary)]">microwave</div>
                </div>
              </div>
            </div>

            <div className="reveal terminal-card p-6 font-mono text-xs">
              <div className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                on the bench
              </div>
              <ul className="space-y-2 text-foreground/90">
                <li><span className="text-[var(--primary)]">→</span> athena firmware + enclosure</li>
                <li><span className="text-[var(--primary)]">→</span> yagi-uda element modeling</li>
                <li><span className="text-[var(--primary)]">→</span> microwave RF theory</li>
                <li><span className="text-[var(--primary)]">→</span> more time on SDR++</li>
              </ul>
              <div className="mt-5 border-t border-[var(--border)] pt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                last sync · <LastSync />
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

          <div className="reveal mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            scale · learning 40 · beginner 30 · working 65 · comfortable 80 · mastered 95
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
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--primary)]">
                  {p.status}
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

      {/* RF LAB */}
      <section id="rf" className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_04" title="ls ./rf_lab" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="reveal terminal-card p-6 lg:col-span-7">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)] accent-glow" />
                active build
              </div>
              <div className="font-mono text-xl text-foreground">
                <span className="text-[var(--primary)]">$</span> yagi-uda + log-periodic
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Designing directional antennas for the microwave band while
                sharpening the theory behind element spacing, gain patterns,
                and impedance matching. Next step after the homemade dipole,
                and the last gate before transmission.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Microwave", "Yagi-Uda", "Log-Periodic", "Directional", "Design"].map((t) => (
                  <span
                    key={t}
                    className="border border-[var(--border)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal terminal-card p-6 font-mono text-xs lg:col-span-5">
              <div className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                gear on the bench
              </div>
              <ul className="space-y-2 text-foreground/90">
                <li><span className="text-[var(--primary)]">→</span> RTL-SDR v4 dongle</li>
                <li><span className="text-[var(--primary)]">→</span> SDR++ (desktop + Android)</li>
                <li><span className="text-[var(--primary)]">→</span> Homemade multi-band dipole</li>
                <li><span className="text-[var(--primary)]">→</span> RF front-end: bias tee · LNA · FM notch</li>
                <li><span className="text-[var(--primary)]">→</span> LMR-240 coax + SMA adapters</li>
                <li className="text-muted-foreground"><span className="text-[var(--primary)]">→</span> HackRF One <span className="opacity-70">// planned</span></li>
              </ul>
            </div>

            <div className="reveal terminal-card p-6 lg:col-span-8">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)] accent-glow" />
                what I listen to
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {rfTargets.map(([label, band]) => (
                  <div key={label} className="border border-[var(--border)] p-3">
                    <div className="text-foreground">{label}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">{band}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal terminal-card p-6 lg:col-span-4">
              <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                next target
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Right now I'm listening. Next step is to go from passive
                monitoring to controlled transmission — understanding power,
                harmonics, and legality before I ever key a mic.
              </p>
              <div className="mt-4 font-mono text-xs text-[var(--primary)]">
                → goal: master RF, not just hear it
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader tag="section_05" title="./connect" />

          <div className="reveal mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="terminal-card p-6 font-mono text-sm">

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
          <div>© {new Date().getFullYear()} tamim mostafa · all packets reserved</div>
          <div>
            cairo, eg ·{" "}
            <span className="text-[var(--primary)]">connection: secure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BuriedPortrait() {
  return (
    <div className="portrait-buried" aria-hidden="true">
      <img src={portraitBlueprint} alt="" className="portrait-layer portrait-base" />
      <img src={portraitBlueprint} alt="" className="portrait-layer portrait-ghost-1" />
      <img src={portraitBlueprint} alt="" className="portrait-layer portrait-ghost-2" />
      <div className="portrait-rain" />
      <div className="portrait-scan" />
      <div className="portrait-dust" />
      <div className="portrait-tag">
        <span className="text-[var(--primary)]">●</span> subject_0x7F
      </div>
      <div className="portrait-tag br">phi 1.618 · scanning…</div>
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

    const subject = `[tamim.site] message from ${n}`;
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
        opens your mail client · sends to {MY_EMAIL}
      </div>
    </form>
  );
}
