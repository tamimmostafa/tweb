import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { sfx } from "@/lib/sfx";

type Entry = {
  id: string;
  handle: string;
  message: string;
  created_at: string;
};

const schema = z.object({
  handle: z.string().trim().min(1).max(32).regex(/^[^\n\r]+$/, "no newlines"),
  message: z.string().trim().min(1).max(200),
});

export function GuestbookSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [handle, setHandle] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [lastPost, setLastPost] = useState(0);

  const load = async () => {
    const { data } = await supabase
      .from("guestbook_entries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30);
    if (data) setEntries(data as Entry[]);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("guestbook")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook_entries" },
        (payload) => setEntries((prev) => [payload.new as Entry, ...prev].slice(0, 30)),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const now = Date.now();
    if (now - lastPost < 8000) {
      setErr("slow down · 8s cooldown");
      return;
    }
    const parsed = schema.safeParse({ handle, message });
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "invalid input");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("guestbook_entries").insert(parsed.data);
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    sfx.success();
    setMessage("");
    setLastPost(now);
  };

  return (
    <section id="guestbook" className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal mb-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--primary)]">
            section_06
          </div>
          <h2 className="font-mono text-3xl font-bold md:text-5xl">
            <span className="text-muted-foreground">$</span> ./guestbook --signal
            <span className="cursor-blink" />
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            leave a signal in the noise. visible to everyone. no auth, no
            tracking — just a handle and a message.
          </p>
          <hr className="divider-dotted mt-6" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <form
            onSubmit={submit}
            className="terminal-card flex flex-col gap-3 p-6 font-mono text-sm"
            noValidate
          >
            <label className="text-xs text-muted-foreground">
              <span className="text-[var(--primary)]">$</span> handle
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                maxLength={32}
                required
                className="mt-1 w-full border border-[var(--border)] bg-transparent px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--primary)] focus:outline-none"
                placeholder="anon_0x42"
              />
            </label>
            <label className="text-xs text-muted-foreground">
              <span className="text-[var(--primary)]">$</span> message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                required
                rows={3}
                className="mt-1 w-full resize-none border border-[var(--border)] bg-transparent px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--primary)] focus:outline-none"
                placeholder="say something to the void"
              />
              <div className="mt-1 text-right text-[10px] text-muted-foreground/60">
                {message.length}/200
              </div>
            </label>
            {err && (
              <div className="text-xs text-[var(--primary)]">
                <span className="opacity-60">!</span> {err}
              </div>
            )}
            <button
              type="submit"
              disabled={busy}
              className="group inline-flex items-center justify-center gap-2 border border-[var(--primary)] bg-[var(--primary)]/10 px-4 py-2 text-sm text-[var(--primary)] accent-glow transition hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] disabled:opacity-50"
            >
              <span>{busy ? "transmitting…" : "./broadcast"}</span>
              <span className="transition group-hover:translate-x-1">→</span>
            </button>
          </form>

          <div className="terminal-card p-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span className="text-muted-foreground">~/signals.log</span>
              <span className="text-[var(--primary)]">{entries.length} entries</span>
            </div>
            <div className="scrollbar-thin mt-3 max-h-[360px] space-y-3 overflow-y-auto pr-2">
              {entries.length === 0 && (
                <div className="text-muted-foreground/70">
                  &gt; no signals yet. be the first.
                </div>
              )}
              {entries.map((e) => (
                <div key={e.id} className="border-l-2 border-[var(--border)] pl-3 hover:border-[var(--primary)] transition">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[var(--primary)]">@{e.handle}</span>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                      {new Date(e.created_at).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="mt-1 text-foreground/90 break-words whitespace-pre-wrap">
                    {e.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
