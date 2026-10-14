"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./Logo";
import { cn } from "@/lib/utils";

/** Hand-drawn style underline that draws itself when scrolled into view. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 16"
      preserveAspectRatio="none"
      className={cn("h-3 w-full", className)}
      aria-hidden="true"
    >
      <motion.path
        d="M4 10 C 44 3, 84 13, 124 8 S 204 12, 236 6"
        fill="none"
        stroke="#FF0033"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
      />
    </svg>
  );
}

/** Rotating circular badge — "GET ROASTED • STAY HUMBLE •" around the logo mark. */
export function SpinBadge({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid place-items-center", className)} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="animate-spin-slower size-full">
        <defs>
          <path id="rmt-badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="font-roast-mono" fontSize="10.5" fontWeight="700" letterSpacing="2.5" fill="#A1A1AA">
          <textPath href="#rmt-badge-circle">GET ROASTED • STAY HUMBLE • GET ROASTED •</textPath>
        </text>
      </svg>
      <span className="absolute">
        <LogoMark className="size-10" idSuffix="badge" />
      </span>
    </div>
  );
}

/** Decorative flickering flame with glow. Pure SVG + CSS, no emoji. */
export function FlickerFlame({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="absolute inset-0 scale-150 rounded-full bg-roast/30 blur-2xl" />
      <svg viewBox="0 0 64 80" className="animate-flicker relative h-full w-full origin-bottom">
        <defs>
          <linearGradient id="rmt-flame-outer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FF6A00" />
            <stop offset="1" stopColor="#FF0033" />
          </linearGradient>
        </defs>
        <path
          d="M32 3c3.5 13 17 20 17 41a17 17 0 0 1-34 0c0-9 5-14 8.5-18C26 30 28 34 31 36c-1.5-9 1.5-22 1-33z"
          fill="url(#rmt-flame-outer)"
        />
        <path
          d="M32 34c1.8 6.5 8 9.5 8 18a8 8 0 0 1-16 0c0-4.2 2.3-6.6 4-8.5 1.2 1.8 2.2 3.4 3.4 4.4-.7-4.3.3-9.6.6-13.9z"
          fill="#FFD400"
        />
      </svg>
    </div>
  );
}

/** Four-point sparkle that twinkles. Stagger via style animationDelay. */
export function Sparkle({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("animate-twinkle", className)}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 2c.7 4.8 3.2 7.3 8 8-4.8.7-7.3 3.2-8 8-.7-4.8-3.2-7.3-8-8 4.8-.7 7.3-3.2 8-8z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Rising ember particles for the CTA panel. */
const EMBERS = [
  { left: "6%", size: 5, delay: "0s", dur: "6.5s" },
  { left: "14%", size: 3, delay: "1.2s", dur: "7.5s" },
  { left: "23%", size: 6, delay: "2.8s", dur: "6s" },
  { left: "33%", size: 4, delay: "0.6s", dur: "8s" },
  { left: "45%", size: 3, delay: "3.4s", dur: "7s" },
  { left: "55%", size: 5, delay: "1.8s", dur: "6.8s" },
  { left: "66%", size: 3, delay: "4.1s", dur: "7.2s" },
  { left: "75%", size: 6, delay: "0.3s", dur: "6.2s" },
  { left: "84%", size: 4, delay: "2.2s", dur: "7.8s" },
  { left: "92%", size: 5, delay: "3s", dur: "6.6s" },
];

export function EmberField({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="animate-ember absolute bottom-6 rounded-full"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            animationDelay: e.delay,
            animationDuration: e.dur,
            background: i % 3 === 0 ? "#FFD400" : "#FF6A00",
            boxShadow: "0 0 8px 2px rgba(255,106,0,0.6)",
          }}
        />
      ))}
    </div>
  );
}
