const items = [
  "BRAIN-ROT 92",
  "RED FLAG 🚩",
  "CHRONICALLY ONLINE",
  "LOST CAUSE",
  "TERMINALLY COOKED",
  "TOUCH GRASS 🌱",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-card py-3.5">
      <div className="animate-marquee flex w-max gap-8 pr-8">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-roast-mono text-sm font-bold tracking-widest whitespace-nowrap text-muted"
          >
            {t} <span className="ml-8 text-roast">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
