import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sfx";

const CHARS = "!<>-_\\/[]{}—=+*^?#█▓▒░01ABCDEF";

export function Scramble({
  text,
  className = "",
  trigger = "hover",
  duration = 450,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  trigger?: "hover" | "mount" | "view";
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const [out, setOut] = useState(text);
  const raf = useRef<number | null>(null);
  const elRef = useRef<HTMLElement | null>(null);

  const run = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const start = performance.now();
    const len = text.length;
    sfx.hover();
    const step = () => {
      const t = (performance.now() - start) / duration;
      if (t >= 1) {
        setOut(text);
        raf.current = null;
        return;
      }
      let s = "";
      for (let i = 0; i < len; i++) {
        const reveal = t * len;
        if (i < reveal - 1) s += text[i];
        else if (text[i] === " ") s += " ";
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    setOut(text);
    if (trigger === "mount") run();
    if (trigger === "view" && elRef.current) {
      const el = elRef.current;
      const io = new IntersectionObserver(
        (ents) => {
          if (ents[0].isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  const props = {
    ref: elRef as React.RefObject<HTMLElement>,
    className,
    onMouseEnter: trigger === "hover" ? run : undefined,
  };

  return <Tag {...(props as React.HTMLAttributes<HTMLElement>)}>{out}</Tag>;
}
