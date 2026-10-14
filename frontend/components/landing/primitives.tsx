"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

/** Butter-smooth scroll reveal — subtle rise + de-blur, varied per section via delay. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Editorial section header: mono kicker + rule, big display title, ghost index numeral. */
export function SectionHeading({
  index,
  kick,
  title,
  sub,
}: {
  index: string;
  kick: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <Reveal>
        <p className="font-roast-mono flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-roast">
          <span className="inline-block h-px w-8 bg-roast" />
          {kick}
        </p>
        <h2 className="font-display mt-4 max-w-xl text-3xl font-bold tracking-tight uppercase sm:text-5xl">
          {title}
        </h2>
        {sub && <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">{sub}</p>}
      </Reveal>
      <span
        aria-hidden="true"
        className="ghost-num font-display hidden shrink-0 text-7xl font-bold select-none sm:block lg:text-8xl"
      >
        {index}
      </span>
    </div>
  );
}

/** Sets --mx/--my CSS vars on the hovered element for the .spotlight effect. */
export function useSpot<T extends HTMLElement>() {
  return useCallback((e: MouseEvent<T>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

/** Subtle 3D tilt following the cursor. Wraps hero/demo cards. */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  return (
    <div style={{ perspective: "1000px" }} className={className}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          if (ref.current) ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        }}
        style={
          {
            transformStyle: "preserve-3d",
            transition: hovering ? "transform 0.08s linear" : "transform 0.6s ease",
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
