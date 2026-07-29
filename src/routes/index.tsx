import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { BootScreen } from "@/components/BootScreen";
import { contactSchema, type ContactInput } from "@/lib/contact.schemas";
import { submitContact } from "@/lib/contact.functions";
import portraitAsset from "@/assets/portrait-v2.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tamim Mostafa — Computer Engineer / RF Tinkerer" },
      {
        name: "description",
        content:
          "Tamim Mostafa — Computer Engineering student in Cairo. Building at the intersection of electronics, RF, AI, and security.",
      },
      { property: "og:title", content: "Tamim Mostafa — Computer Engineer / RF Tinkerer" },
      {
        property: "og:description",
        content:
          "Computer Engineering student in Cairo. Building at the intersection of electronics, RF, AI, and security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
});

const navLinks = [
  ["01", "About", "#about"],
  ["02", "Work", "#work"],
  ["03", "Stack", "#stack"],
  ["04", "Reach", "#reach"],
] as const;

const skillGroups = [
  {
    code: "STK_01",
    title: "Build",
    items: ["C", "C++", "Python", "JavaScript", "ESP-IDF / Arduino", "KiCad"],
  },
  {
    code: "STK_02",
    title: "RF & Signal",
    items: ["RTL-SDR v4", "SDR++", "Antenna design", "Yagi-Uda / log-periodic", "Signal ID"],
  },
  {
    code: "STK_03",
    title: "Systems",
    items: ["Linux", "Networking", "Nmap", "Git & GitHub", "Docker", "LLM tooling"],
  },
];

const projects = [
  {
    idx: "P.01",
    name: "Athena",
    desc: "ESP32-S3 multitool that can trace, transmit, attack, and scan across several RF stacks. Sub-GHz via CC1101, 2.4 GHz via nRF24, LoRa via SX1276, plus GPS, microSD, and a 2.8\" TFT UI. Designed and built from scratch.",
    tags: ["ESP32-S3", "CC1101", "nRF24", "SX1276", "GPS"],
    status: "Firmware release · Aug 19",
    href: "https://github.com/tamimmostafa",
  },
  {
    idx: "P.02",
    name: "Homemade Dipole Antenna",
    desc: "A multi-band dipole tuned to receive roughly 70–300 MHz. Built with LMR-240 feedline, telescopic elements, and a full RF front-end: bias tee, gain amplifier, and FM band-stop filter.",
    tags: ["RF", "Dipole", "LMR-240", "LNA", "FM Notch"],
    status: "Release · this month",
    href: "https://github.com/tamimmostafa",
  },
];

const contacts = [
  { label: "GitHub", handle: "github.com/tamimmostafa", href: "https://github.com/tamimmostafa" },
  { label: "LinkedIn", handle: "linkedin.com/in/tamimmostafa", href: "https://linkedin.com/in/tamimmostafa" },
  { label: "Email", handle: "support.tamim@gmail.com", href: "mailto:support.tamim@gmail.com" },
];

const tickerItems = [
  "ATHENA FIRMWARE — GITHUB DROP · AUG 19",
  "FAIL AGAIN. FAIL BETTER.",
  "BROADBAND DIPOLE ANTENNA — RELEASE THIS MONTH",
];


function Index() {
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
    <div id="top" className="min-h-screen bg-background font-sans text-foreground">
      {!booted && <BootScreen onDone={finishBoot} />}
      <Toaster position="bottom-right" theme="light" />

      {/* Dots background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] grid-dots"
      />

      <div className="relative z-10">
        <StatusBar />
        <NavBar />
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Stack />
        <Reach />
        <Footer />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="border-b-2 border-foreground bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        <div className="flex items-center gap-4">
          <span className="meta-label font-bold text-foreground underline decoration-2 underline-offset-2">
            SYSTEM_ARCH_V1.0
          </span>
          <span className="meta-label hidden md:inline">// PORTFOLIO_CTX</span>
        </div>
        <span className="meta-label text-foreground">
          CAIRO · COMPUTER ENGINEERING STUDENT
        </span>
      </div>
    </div>
  );
}


function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center border-2 border-foreground bg-foreground font-mono text-xs font-bold text-background">
            T
          </span>
          <span className="font-mono text-sm font-bold uppercase tracking-tighter">
            TAMIM_MOSTAFA
          </span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map(([num, label, href]) => (
            <a
              key={label}
              href={href}
              className="group flex items-baseline gap-1.5 font-mono text-xs font-bold uppercase tracking-widest transition"
            >
              <span className="text-foreground/40 group-hover:text-foreground">{num}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <a href="#reach" className="btn-brutal !py-2 !px-4 text-[10px]">
          Say Hello →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b-2 border-foreground">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]">
          {/* Left: Identity */}
          <div className="border-b-2 border-foreground p-6 py-16 md:p-16 lg:border-r-2 lg:border-b-0">
            <div className="mb-10 flex items-center gap-4">
              <span className="border-2 border-foreground bg-foreground px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-tighter text-background">
                v.3.0 // 2026
              </span>
              <div className="h-0.5 flex-1 bg-foreground/20" />
            </div>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl">
              TAMIM
              <br />
              MOSTAFA
            </h1>

            <p className="mt-10 max-w-lg text-xl leading-tight font-medium md:text-2xl">
              Computer engineering student building tools at the seam of{" "}
              <span className="bg-foreground px-1 text-background">electronics</span>,{" "}
              <span className="bg-foreground px-1 text-background">RF</span>, AI &amp; security.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-8 border-t-2 border-foreground/10 pt-8">
              <div>
                <span className="meta-label mb-3 block">Core Competencies</span>
                <ul className="space-y-1 font-mono text-xs">
                  <li>→ Antenna design</li>
                  <li>→ Embedded firmware</li>
                  <li>→ Network recon</li>
                  <li>→ LLM tooling</li>
                </ul>
              </div>
              <div>
                <span className="meta-label mb-3 block">Direct Access</span>
                <ul className="space-y-1 font-mono text-xs">
                  <li>
                    <a href="#work" className="underline decoration-2 underline-offset-2">
                      Selected Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/tamimmostafa"
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-2 underline-offset-2"
                    >
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a href="#reach" className="underline decoration-2 underline-offset-2">
                      Send a Signal
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#work" className="btn-brutal">
                View Work
              </a>
              <a href="#reach" className="btn-brutal-outline">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="relative flex items-center justify-center bg-foreground p-6 md:p-10">
            <div className="relative aspect-[3/4] w-full max-w-xs">
              <div className="brutal-frame relative h-full w-full overflow-hidden bg-foreground">
                <img
                  src={portraitAsset.url}
                  alt="Blueprint illustration of Tamim Mostafa"
                  className="h-full w-full object-cover"
                />
                {/* Subtle inner grid to tie into the illustration's frame */}
                <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              </div>

              {/* Rotated caption */}
              <div className="absolute -right-4 top-1/4 translate-x-full">
                <span className="meta-label block origin-left -rotate-90 whitespace-nowrap font-bold text-foreground">
                  SUBJECT_PROFILE:001
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="meta-label">SCALE 1:1</span>
                <span className="meta-label">RAW_V02</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-b-2 border-foreground bg-foreground py-3 text-background">
      <div className="flex ticker whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="mx-8 font-mono text-xs font-bold uppercase tracking-widest">
            {t} <span className="mx-8 opacity-40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ code, kicker, title }: { code: string; kicker: string; title: string }) {
  return (
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="meta-label">
          [{code}] // {kicker}
        </span>
        <h2 className="font-display mt-3 text-4xl md:text-6xl">{title}</h2>
      </div>
      <div className="h-0.5 flex-1 bg-foreground md:ml-8 md:max-w-md" />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="border-b-2 border-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeader code="SEC.01" kicker="Origin" title="WHO / I / AM" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="brutal-card p-8 lg:col-span-2">
            <div className="space-y-6 text-lg leading-snug">
              <p>
                I'm <strong>Tamim Mostafa</strong>, a computer engineering student based in Cairo.
                My interests sit at the intersection of electronics, RF, AI, and security — the
                parts of the stack where hardware and software meet.
              </p>
              <p>
                I like taking systems apart to see how they actually work. I build my own antennas,
                design embedded tools, work with LLMs, and read a lot about protocols nobody thinks
                about anymore. The goal is to build secure, intelligent technology that solves real
                problems.
              </p>
              <p>
                Currently focused on{" "}
                <span className="bg-foreground px-1 text-background">microwave-band RF theory</span>{" "}
                and designing directional antenna setups — Yagi-Uda and log-periodic geometries — to
                push receive performance and get closer to controlled, legal transmission.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="brutal-card p-6">
              <span className="meta-label">Location</span>
              <p className="mt-2 font-mono text-sm font-bold">Cairo, Egypt</p>
              <p className="font-mono text-xs text-foreground/60">30.04°N, 31.24°E</p>
            </div>
            <div className="brutal-card p-6">
              <span className="meta-label">Discipline</span>
              <p className="mt-2 font-mono text-sm font-bold">Computer Engineering</p>
              <p className="font-mono text-xs text-foreground/60">Undergraduate</p>
            </div>
            <div className="brutal-card p-6">
              <span className="meta-label">Status</span>
              <p className="mt-2 flex items-center gap-2 font-mono text-sm font-bold">
                <span className="pulse-dot h-2 w-2 rounded-full bg-foreground" />
                Open to opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="border-b-2 border-foreground bg-[color:var(--surface-2)]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeader code="SEC.02" kicker="Archive" title="SELECTED / WORKS" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="brutal-card group flex flex-col p-6"
            >
              <div className="flex items-start justify-between border-b-2 border-foreground pb-4">
                <span className="font-mono text-xs font-bold text-foreground/60">{p.idx}</span>
                <span className="font-mono text-lg font-bold transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <h3 className="font-display mt-4 text-2xl">{p.name}</h3>
              <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/60">
                {p.status}
              </p>
              <p className="mt-4 flex-1 text-sm leading-snug">{p.desc}</p>
              <div className="mt-6 flex flex-wrap gap-1.5 border-t-2 border-foreground/10 pt-4">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-foreground px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
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
  );
}

function Stack() {
  return (
    <section id="stack" className="border-b-2 border-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeader code="SEC.03" kicker="Toolkit" title="THE / STACK" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="brutal-card p-6">
              <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3">
                <h3 className="font-mono text-sm font-bold uppercase tracking-tighter">
                  {g.title}
                </h3>
                <span className="font-mono text-[10px] font-bold text-foreground/40">
                  {g.code}
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {g.items.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-baseline justify-between font-mono text-xs">
                      <span className="font-bold">{s.name}</span>
                      <span className="text-foreground/60">{s.level.toString().padStart(2, "0")}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full border-2 border-foreground bg-background">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: `${s.level}%` }}
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
  );
}

function Reach() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await submitContact({ data });
      if (result.ok) {
        toast.success(
          result.emailSent
            ? "Message sent — I'll get back to you soon."
            : "Message saved — email delivery is pending setup."
        );
        reset();
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      toast.error(message);
    }
  });

  return (
    <section id="reach" className="border-b-2 border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background/60">
              [SEC.04] // Signal
            </span>
            <h2 className="font-display mt-3 text-4xl md:text-6xl">SEND / A / SIGNAL</h2>
          </div>
          <div className="h-0.5 flex-1 bg-background md:ml-8 md:max-w-md" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={onSubmit}
            className="border-2 border-background bg-foreground p-6 md:p-8"
            style={{ boxShadow: "8px 8px 0 0 var(--background)" }}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background/60"
                >
                  01 / Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="mt-2 w-full border-2 border-background bg-transparent px-3 py-3 font-mono text-sm text-background placeholder:text-background/40 focus:outline-none focus:bg-background focus:text-foreground"
                  placeholder="YOUR_NAME"
                />
                {errors.name && (
                  <p className="mt-1 font-mono text-[10px] text-background">! {errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background/60"
                >
                  02 / Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-2 w-full border-2 border-background bg-transparent px-3 py-3 font-mono text-sm text-background placeholder:text-background/40 focus:outline-none focus:bg-background focus:text-foreground"
                  placeholder="YOU@DOMAIN"
                />
                {errors.email && (
                  <p className="mt-1 font-mono text-[10px] text-background">! {errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background/60"
              >
                03 / Subject
              </label>
              <input
                id="subject"
                type="text"
                {...register("subject")}
                className="mt-2 w-full border-2 border-background bg-transparent px-3 py-3 font-mono text-sm text-background placeholder:text-background/40 focus:outline-none focus:bg-background focus:text-foreground"
                placeholder="WHAT_IS_THIS_ABOUT"
              />
              {errors.subject && (
                <p className="mt-1 font-mono text-[10px] text-background">! {errors.subject.message}</p>
              )}
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background/60"
              >
                04 / Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={5}
                className="mt-2 w-full resize-none border-2 border-background bg-transparent px-3 py-3 font-mono text-sm text-background placeholder:text-background/40 focus:outline-none focus:bg-background focus:text-foreground"
                placeholder="TELL_ME_WHAT_YOU_ARE_THINKING"
              />
              {errors.message && (
                <p className="mt-1 font-mono text-[10px] text-background">! {errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-between border-2 border-background bg-background px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-foreground transition hover:bg-foreground hover:text-background disabled:opacity-50"
            >
              <span>{isSubmitting ? "TRANSMITTING…" : "TRANSMIT →"}</span>
              <span className="opacity-50">RUN</span>
            </button>
          </form>

          <div className="flex flex-col justify-between">
            <div>
              <p className="font-display text-3xl">OPEN / CHANNEL</p>
              <p className="mt-4 leading-snug text-background/70">
                Talk about a project, an opportunity, antennas, or just say hello. I read every
                message and reply as soon as I can.
              </p>
            </div>

            <div className="mt-10 space-y-0 border-t-2 border-background">
              {contacts.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b-2 border-background px-1 py-4 transition hover:bg-background hover:text-foreground hover:px-4"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">
                    {String(i + 1).padStart(2, "0")} / {c.label}
                  </span>
                  <span className="font-mono text-sm font-bold transition group-hover:translate-x-1">
                    {c.handle} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {navLinks.map(([num, label, href]) => (
          <a
            key={label}
            href={href}
            className="group flex h-28 flex-col justify-between border-r-2 border-b-2 border-foreground p-6 transition hover:bg-foreground hover:text-background last:border-r-0"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40 group-hover:text-background/60">
              {num} / Section
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold uppercase">{label}</span>
              <span className="opacity-0 transition group-hover:opacity-100">→</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 md:flex-row md:px-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">
          © {new Date().getFullYear()} TAMIM_MOSTAFA · BUILT_BY_HAND
        </p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">
          END_OF_TRANSMISSION ◆
        </p>
      </div>
    </footer>
  );
}
