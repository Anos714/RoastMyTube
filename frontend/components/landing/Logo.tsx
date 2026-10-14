import { cn } from "@/lib/utils";

/**
 * RoastMyTube mark — a play button melting under its own roast.
 * Custom SVG: roast-gradient tile, white play triangle with a drip
 * falling off its bottom vertex, two toxic-yellow sparks.
 */
export function LogoMark({
  className,
  idSuffix = "a",
}: {
  className?: string;
  idSuffix?: string;
}) {
  const gid = `rmt-g-${idSuffix}`;
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF0033" />
          <stop offset="1" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill={`url(#${gid})`} />
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="9"
        fill="none"
        stroke="#000"
        strokeOpacity="0.4"
      />
      <ellipse cx="16" cy="7" rx="10" ry="3.2" fill="#fff" opacity="0.16" />
      {/* play triangle */}
      <path d="M12.5 10.2 21.8 15.8l-9.3 5.6z" fill="#fff" />
      {/* drip melting off the bottom vertex */}
      <rect x="11.3" y="20.4" width="2.4" height="3.6" rx="1.2" fill="#fff" />
      <circle cx="12.5" cy="25.7" r="1.1" fill="#fff" opacity="0.9" />
      {/* sparks */}
      <path
        d="M24.6 4.2c.3 1.7 1 2.4 2.7 2.7-1.7.3-2.4 1-2.7 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1 2.7-2.7z"
        fill="#FFD400"
      />
      <circle cx="27" cy="11.6" r="1" fill="#FFD400" opacity="0.85" />
    </svg>
  );
}

export function Logo({
  markClass = "size-9",
  compact = false,
  idSuffix = "a",
  href = "#top",
}: {
  markClass?: string;
  compact?: boolean;
  idSuffix?: string;
  href?: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-2.5" aria-label="RoastMyTube home">
      <span className="transition-transform duration-300 ease-out group-hover:-rotate-[10deg] group-hover:scale-110">
        <LogoMark className={cn(markClass, "drop-shadow-[0_0_18px_rgba(255,0,51,0.45)]")} idSuffix={idSuffix} />
      </span>
      <span className="leading-none">
        <span className={cn("font-display block font-bold tracking-tight", compact ? "text-sm" : "text-lg")}>
          Roast<span className="text-roast">My</span>Tube
        </span>
        {!compact && (
          <span className="font-roast-mono mt-1 block text-[9px] font-semibold tracking-[0.28em] text-muted">
            CERTIFIED ROASTS
          </span>
        )}
      </span>
    </a>
  );
}
