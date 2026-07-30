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
  ["About", "#about"],
  ["Work", "#work"],
  ["Stack", "#stack"],
  ["Reach", "#reach"],
] as const;

const skillGroups = [
  {
    title: "Build",
    items: ["C", "C++", "Python", "JavaScript", "Arduino", "KiCad"],
  },
  {
    title: "RF & Signal",
    items: ["RF Basics", "SDR", "Antenna design", "Spectrum management", "Signal ID"],
  },
  {
    title: "Systems",
    items: ["Linux", "CLI", "Networking", "Partitioning", "Docker", "OS Troubleshooting"],
  },
];

const projects = [
  {
    name: "ATHENA",
    desc: "ESP32 multi-band penetration testing tool with the capabilities of disrupting and analyzing 2.4 GHz Wi-Fi, Sub-1 GHz, BLE, and other wireless bands. Made using just an ESP32, antennas, a battery, a screen, modules, and sensors.",
    tags: ["//", "//", "\u00a0 \u00a0 \u00a0UNDER_CONSTRUCTION \u00a0 \u00a0 \u00a0", "//", "//"],
    href: "https://github.com/tamimmostafa",
  },
  {
    name: "DIY DIPOLE ANTENNA",
    desc: "If you're into RF and SDR, this simple antenna unlocks a better receiving experience. All you need is two metal conductors (preferably copper), a low loss coaxial cable, and connectors. Click here to learn more.",
    tags: ["//", "//", "//", "//", "THE BEGINNER FRIENDLY ANTENNA"],
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
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-xs font-bold uppercase tracking-widest transition hover:underline decoration-2 underline-offset-4"
            >
              {label}
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

            <div className="mt-10 max-w-lg border-t-2 border-foreground/10 pt-8">
              <span className="meta-label mb-3 block">Core Competencies</span>
              <ul className="grid grid-cols-2 gap-y-1 font-mono text-xs">
                <li>→ Antenna design</li>
                <li>→ Embedded firmware</li>
                <li>→ Network recon</li>
                <li>→ LLM tooling</li>
              </ul>
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
          <div className="relative flex items-center justify-center bg-background p-6 md:p-10">
            <div className="relative aspect-[3/4] w-full max-w-xs">
              <img
                src={portraitAsset.url}
                alt="Blueprint illustration of Tamim Mostafa"
                className="h-full w-full object-cover mix-blend-multiply"
              />
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

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="font-display text-4xl md:text-6xl">{title}</h2>
      </div>
      <div className="h-0.5 flex-1 bg-foreground md:ml-8 md:max-w-md" />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="border-b-2 border-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeader title="About" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="brutal-card p-8 lg:col-span-2">
            <div className="space-y-6 text-lg leading-snug">
              <p>
                I'm <strong>Tamim Mostafa</strong>. a 17-year-old student with a passion for
                technology and engineering. Whether it's a modern device or an old machine, I'm
                always curious about how it works and what makes it operate. I enjoy turning
                curiosity into knowledge, and I'm constantly exploring new technologies while
                pushing myself to learn more every day.
              </p>
              <p>
                My strongest skills today are in cybersecurity and penetration testing, with a
                solid foundation in enterprise networking. I'm highly proficient in configuring and
                managing routers, switches, and network infrastructure, and working with them feels
                second nature. I enjoy solving complex networking challenges, optimizing secure
                environments, and continuously expanding my knowledge to stay current with
                evolving technologies. This is the career path I'm focused on, and I'm committed to
                developing my expertise even further.
              </p>
              <p>
                This page showcases my achievements, challenges, goals, and interests, reflecting
                my journey, experiences, and continuous growth.
              </p>
            </div>

          </div>

          <div className="flex flex-col gap-4">
            <div className="brutal-card p-6">
              <span className="meta-label">Location</span>
              <p className="mt-2 font-mono text-sm font-bold">Cairo, Egypt</p>
              <p className="font-mono text-xs text-foreground/60">Nomadic / Roaming / Anywhere</p>
            </div>
            <div className="brutal-card p-6">
              <span className="meta-label">FOCUS</span>
              <p className="mt-2 font-mono text-sm font-bold">Computer Engineering</p>
              <p className="font-mono text-xs text-foreground/60">High-school Student</p>
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
        <SectionHeader title="Work" />

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
                <h3 className="font-display text-2xl">{p.name}</h3>
                <span className="font-mono text-lg font-bold transition group-hover:translate-x-1">
                  →
                </span>
              </div>
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
        <SectionHeader title="Stack" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="brutal-card p-6">
              <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3">
                <h3 className="font-mono text-sm font-bold uppercase tracking-tighter">
                  {g.title}
                </h3>
              </div>
              <p className="mt-5 font-mono text-sm leading-relaxed">
                {g.items.join(" · ")}
              </p>

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
    <section id="reach" className="border-b-2 border-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeader title="Get in touch" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={onSubmit} className="brutal-card p-6 md:p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="meta-label">Name</label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="input-brutal mt-2"
                  placeholder="YOUR_NAME"
                />
                {errors.name && (
                  <p className="mt-1 font-mono text-[10px]">! {errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="meta-label">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="input-brutal mt-2"
                  placeholder="YOU@DOMAIN"
                />
                {errors.email && (
                  <p className="mt-1 font-mono text-[10px]">! {errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="meta-label">Subject</label>
              <input
                id="subject"
                type="text"
                {...register("subject")}
                className="input-brutal mt-2"
                placeholder="WHAT_IS_THIS_ABOUT"
              />
              {errors.subject && (
                <p className="mt-1 font-mono text-[10px]">! {errors.subject.message}</p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="meta-label">Message</label>
              <textarea
                id="message"
                {...register("message")}
                rows={5}
                className="input-brutal mt-2 resize-none"
                placeholder="TELL_ME_WHAT_YOU_ARE_THINKING"
              />
              {errors.message && (
                <p className="mt-1 font-mono text-[10px]">! {errors.message.message}</p>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-brutal mt-6 w-full disabled:opacity-50">
              {isSubmitting ? "TRANSMITTING…" : "SEND →"}
            </button>
          </form>

          <div className="flex flex-col justify-between">
            <div>
              <p className="font-display text-3xl">Open channel</p>
              <p className="mt-4 leading-snug text-foreground/70">
                Talk about a project, an opportunity, antennas, or just say hello. I read every
                message and reply as soon as I can.
              </p>
            </div>

            <div className="mt-10 border-t-2 border-foreground">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b-2 border-foreground px-1 py-4 transition hover:bg-foreground hover:text-background hover:px-4"
                >
                  <span className="meta-label">{c.label}</span>
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
        {navLinks.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="group flex h-24 items-end justify-between border-r-2 border-b-2 border-foreground p-6 transition hover:bg-foreground hover:text-background last:border-r-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold uppercase">{label}</span>
              <span className="opacity-0 transition group-hover:opacity-100">→</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 md:flex-row md:px-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">
          DESIGNED, SOLDERED &amp; SHIPPED BY TAMIM MOSTAFA
        </p>
      </div>

    </footer>
  );
}
