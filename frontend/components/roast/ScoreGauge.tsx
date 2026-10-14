"use client";

/**
 * Circular SVG gauge — tick ring lights up with the score.
 * All coordinates are rounded to 2 decimals: raw float trig produces
 * last-digit differences between SSR HTML and client render (hydration error).
 */
export function ScoreGauge({ score }: { score: number }) {
  const f = (n: number) => n.toFixed(2);
  return (
    <div className="relative mx-auto size-48 shrink-0 sm:mx-0">
      <svg viewBox="0 0 200 200" className="size-full -rotate-90">
        <defs>
          <linearGradient id="rmt-gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF0033" />
            <stop offset="55%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#FFD400" />
          </linearGradient>
        </defs>
        {Array.from({ length: 40 }).map((_, i) => {
          const a = (i / 40) * Math.PI * 2;
          const lit = i / 40 <= score / 100;
          const outer = i % 10 === 0 ? 78 : 83;
          return (
            <line
              key={i}
              x1={f(100 + Math.cos(a) * 88)}
              y1={f(100 + Math.sin(a) * 88)}
              x2={f(100 + Math.cos(a) * outer)}
              y2={f(100 + Math.sin(a) * outer)}
              stroke={lit ? "#FFD400" : "#2b2b2b"}
              strokeWidth={i % 10 === 0 ? 3 : 1.5}
              strokeLinecap="round"
              style={{ transition: "stroke 0.2s" }}
            />
          );
        })}
        <circle cx="100" cy="100" r="66" fill="none" stroke="#222" strokeWidth="13" />
        <circle
          cx="100"
          cy="100"
          r="66"
          fill="none"
          stroke="url(#rmt-gauge)"
          strokeWidth="13"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - score}
          style={{
            transition: "stroke-dashoffset 0.12s linear",
            filter: "drop-shadow(0 0 10px rgba(255,0,51,0.55))",
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="font-roast-mono text-5xl font-bold text-white tabular-nums">{score}</p>
          <p className="font-roast-mono mt-1 text-[10px] tracking-[0.3em] text-muted">/ 100</p>
        </div>
      </div>
    </div>
  );
}
