import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { BootScreen } from "@/components/BootScreen";
import { contactSchema, type ContactInput } from "@/lib/contact.schemas";
import { submitContact } from "@/lib/contact.functions";
import portraitBlueprint from "@/assets/portrait-blueprint.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tamim Mostafa — Portfolio" },
      {
        name: "description",
        content:
          "Tamim Mostafa — Computer Engineering student in Cairo. Building at the intersection of electronics, RF, AI, and security.",
      },
      { property: "og:title", content: "Tamim Mostafa — Portfolio" },
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
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
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
    title: "Languages & Frameworks",
    items: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "C++", level: 78 },
      { name: "PHP", level: 60 },
    ],
  },
  {
    title: "Hardware & Embedded",
    items: [
      { name: "Basic electronics", level: 95 },
      { name: "PC building & diagnostics", level: 80 },
      { name: "ESP32 / Arduino", level: 65 },
      { name: "Soldering", level: 65 },
    ],
  },
  {
    title: "RF & SDR",
    items: [
      { name: "Antenna fundamentals", level: 95 },
      { name: "SDR & software integration", level: 65 },
      { name: "Signal ID / spectrum recon", level: 65 },
      { name: "RF theory", level: 40 },
    ],
  },
  {
    title: "Networking & Security",
    items: [
      { name: "Linux security fundamentals", level: 95 },
      { name: "Network security", level: 80 },
      { name: "Web application security", level: 80 },
      { name: "Nmap", level: 80 },
    ],
  },
  {
    title: "AI & Tools",
    items: [
      { name: "Linux CLI", level: 95 },
      { name: "LLM applications", level: 80 },
      { name: "Git & GitHub", level: 80 },
      { name: "Docker", level: 65 },
    ],
  },
];

const projects = [
  {
    name: "Homemade Dipole Antenna",
    desc: "A multi-band dipole tuned to receive roughly 70–300 MHz. Built with LMR-240 feedline, telescopic elements, and a full RF front-end: bias tee, gain amplifier, and FM band-stop filter. Working on the bench.",
    tags: ["RF", "Dipole", "LMR-240", "Bias Tee", "LNA", "FM Notch"],
    status: "Done · Working",
    href: "https://github.com/tamimmostafa",
  },
  {
    name: "Athena",
    desc: "ESP32-S3 multitool that can trace, transmit, attack, and scan across several RF stacks. Sub-GHz via CC1101, 2.4 GHz via nRF24, LoRa via SX1276, plus GPS, microSD, and a 2.8\" TFT UI. Enclosure and firmware integration in progress.",
    tags: ["ESP32-S3", "CC1101", "nRF24", "SX1276 LoRa", "GPS", "TFT"],
    status: "75% · In Progress",
    href: "https://github.com/tamimmostafa",
  },
  {
    name: "RF Listening Post",
    desc: "A personal RF exploration setup built around an RTL-SDR v4. I listen across airband, VOR/NAV, marine VHF, PMR, DMR, LoRa, ADS-B, and APRS. Next step: directional antennas and controlled transmission.",
    tags: ["RTL-SDR", "SDR++", "Airband", "ADS-B", "Directional", "Microwave"],
    status: "Active · Learning",
    href: "https://github.com/tamimmostafa",
  },
];

const contacts = [
  { label: "GitHub", handle: "github.com/tamimmostafa", href: "https://github.com/tamimmostafa" },
  { label: "LinkedIn", handle: "linkedin.com/in/tamimmostafa", href: "https://linkedin.com/in/tamimmostafa" },
  { label: "Email", handle: "support.tamim@gmail.com", href: "mailto:support.tamim@gmail.com" },
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
      <div className="scanlines" aria-hidden="true" />
      <Toaster position="bottom-right" theme="dark" />
      <NavBar />
      <Hero />
      <About />
      <Work />
      <Stack />
      <Reach />
      <Footer />
    </div>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-serif text-lg tracking-tight text-foreground">
          Tamim Mostafa
        </a>
        <nav className="hidden gap-8 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#reach"
          className="font-mono text-xs uppercase tracking-widest text-foreground transition hover:text-muted-foreground"
        >
          Say hello
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="portrait-glow mx-auto w-full max-w-sm md:max-w-md">
          <img
            src={portraitBlueprint}
            alt="Blueprint illustration of Tamim Mostafa"
            className="aspect-square w-full object-contain"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Computer Engineering · Cairo, EG
          </p>
          <h1 className="font-serif mt-6 text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Tamim Mostafa
          </h1>
          <p className="mt-4 text-lg text-foreground-dim md:text-xl">
            Computer Engineering Student · Electronics Tinkerer · RF Curious
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:max-w-lg">
            I focus on Penetration Testing and Red Team operations, with a strong interest in
            Network Security, Embedded Systems, and Artificial Intelligence. I enjoy building
            tools that bridge hardware and software, and I am always learning how complex systems
            work.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a href="#work" className="btn-primary">
              View my work
            </a>
            <a href="#reach" className="btn-secondary">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
        <h2 className="font-serif mt-4 text-3xl tracking-tight md:text-4xl">Who I am</h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground-dim">
          <p>
            I'm Tamim Mostafa, a computer engineering student based in Cairo. My interests sit at
            the intersection of electronics, RF, AI, and security — the parts of the stack where
            hardware and software meet.
          </p>
          <p>
            I like taking systems apart to see how they actually work. I build my own antennas,
            design embedded tools, work with LLMs, and read a lot about protocols nobody thinks
            about anymore. The goal is to build secure, intelligent technology that solves real
            problems.
          </p>
          <p>
            Currently, I'm focused on microwave-band RF theory and designing directional antenna
            setups — Yagi-Uda and log-periodic geometries — to push receive performance higher and
            get closer to controlled, legal transmission.
          </p>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Work</p>
        <h2 className="font-serif mt-4 text-3xl tracking-tight md:text-4xl">Selected projects</h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="card-clean group flex flex-col p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl tracking-tight">{p.name}</h3>
                <span className="font-mono text-xs text-muted-foreground transition group-hover:text-foreground">
                  ↗
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {p.status}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/80"
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
    <section id="stack" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Stack</p>
        <h2 className="font-serif mt-4 text-3xl tracking-tight md:text-4xl">Skills & tools</h2>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="card-clean p-6">
              <h3 className="font-serif text-lg tracking-tight">{g.title}</h3>
              <div className="mt-5 space-y-4">
                {g.items.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-baseline justify-between font-mono text-xs">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden bg-surface-2">
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
        toast.success(result.emailSent ? "Message sent — I'll get back to you soon." : "Message saved — email delivery is pending setup.");
        reset();
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      toast.error(message);
    }
  });

  return (
    <section id="reach">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Reach</p>
        <h2 className="font-serif mt-4 text-3xl tracking-tight md:text-4xl">Get in touch</h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Name
              </label>
              <input id="name" type="text" {...register("name")} className="input-clean mt-2" placeholder="Your name" />
              {errors.name && <p className="mt-1 font-mono text-xs text-foreground">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input id="email" type="email" {...register("email")} className="input-clean mt-2" placeholder="you@example.com" />
              {errors.email && <p className="mt-1 font-mono text-xs text-foreground">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Subject
              </label>
              <input id="subject" type="text" {...register("subject")} className="input-clean mt-2" placeholder="What is this about?" />
              {errors.subject && <p className="mt-1 font-mono text-xs text-foreground">{errors.subject.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea id="message" {...register("message")} rows={5} className="input-clean mt-2 resize-none" placeholder="Tell me what you're thinking." />
              {errors.message && <p className="mt-1 font-mono text-xs text-foreground">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary mt-2">
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>

          <div className="flex flex-col justify-between">
            <div>
              <p className="font-serif text-xl tracking-tight">Open to conversations</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Whether you want to talk about a project, an opportunity, antennas, or just say
                hello, I'll read every message and reply as soon as I can.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center justify-between border-b border-border py-3 transition hover:text-foreground"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="link-underline text-sm text-foreground">
                    {c.handle}
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
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Tamim Mostafa · Built by hand
      </div>
    </footer>
  );
}
