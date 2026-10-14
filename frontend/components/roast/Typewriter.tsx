"use client";

import { useEffect, useState } from "react";

/** Roast paragraph that types itself out word by word, with a caret. */
export function Typewriter({ text, start }: { text: string; start: boolean }) {
  const words = text.split(" ");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || count >= words.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 34);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, count]);

  return (
    <p className="mt-3 min-h-28 text-sm leading-relaxed text-white/85 sm:min-h-24">
      {words.slice(0, count).join(" ")}
      {count < words.length && <span className="ml-0.5 animate-pulse text-roast">▍</span>}
    </p>
  );
}
