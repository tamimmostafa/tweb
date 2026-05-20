import { useEffect, useState } from "react";
import { sfx } from "@/lib/sfx";


export function Typewriter({
  words,
  className = "",
  speed = 70,
  pause = 1400,
}: {
  words: string[];
  className?: string;
  speed?: number;
  pause?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    if (!del && text === word) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(
      () => {
        setText((cur) => {
          const next = del ? cur.slice(0, -1) : word.slice(0, cur.length + 1);
          if (!del && next.length > cur.length) sfx.tick();
          return next;
        });
      },
      del ? speed / 2 : speed
    );
    return () => clearTimeout(t);

  }, [text, del, i, words, speed, pause]);

  return (
    <span className={className}>
      <span>{text}</span>
      <span className="inline-block w-[10px] -mb-[2px] ml-1 bg-[var(--primary)] animate-pulse" style={{ height: "1em" }} />
    </span>
  );
}
