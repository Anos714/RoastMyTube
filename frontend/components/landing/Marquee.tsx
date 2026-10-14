const items = [
  "BRAIN-ROT 92",
  "RED FLAG",
  "CHRONICALLY ONLINE",
  "LOST CAUSE",
  "TERMINALLY COOKED",
  "TOUCH GRASS",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee-hover -mx-[5%] w-[110%] -rotate-[1.2deg] overflow-hidden border-y border-line bg-card py-3.5">
      <div className="animate-marquee flex w-max gap-8 pr-8">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-roast-mono flex items-center gap-8 text-sm font-bold tracking-widest whitespace-nowrap text-muted"
          >
            {t}
            <svg viewBox="0 0 24 24" className="size-3 text-roast" aria-hidden="true">
              <path
                d="M12 2c.7 4.8 3.2 7.3 8 8-4.8.7-7.3 3.2-8 8-.7-4.8-3.2-7.3-8-8 4.8-.7 7.3-3.2 8-8z"
                fill="currentColor"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
