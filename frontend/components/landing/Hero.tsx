"use client";

import { motion } from "framer-motion";
import { Play, ShieldCheck, EyeOff, Trash2, Star, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "./Logo";
import { SpinBadge, FlickerFlame, Squiggle, Sparkle } from "./decorations";
import type { CSSProperties, MouseEvent } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: "easeOut" as const },
  }),
};

const miniCards = [
  { score: "92", tag: "LOST CAUSE", rotate: "-6deg", text: "Watches 3AM motivation at 3PM in bed." },
  { score: "87", tag: "TERMINALLY COOKED", rotate: "3deg", text: "Subscribed to 14 finance gurus. Still broke." },
  { score: "64", tag: "CHRONICALLY ONLINE", rotate: "-2deg", text: "Knows every lore. Touches no grass." },
];

export function Hero() {
  const onSpot = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="top" onMouseMove={onSpot} className="bg-noise relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-roast/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-40 -left-40 h-72 w-72 rounded-full bg-ember/10 blur-[100px]" />
      {/* cursor-following glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(560px circle at var(--mx, 50%) var(--my, 18%), rgba(255,0,51,0.10), transparent 70%)",
        }}
      />
      {/* dotted texture, top-right */}
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute top-0 right-0 h-72 w-72 opacity-60 [mask-image:radial-gradient(closest-side,black,transparent)]" />

      {/* twinkles */}
      <Sparkle className="absolute top-28 left-[8%] size-4 text-toxic" />
      <Sparkle className="absolute top-64 right-[10%] hidden size-5 text-roast md:block" style={{ animationDelay: "0.9s" }} />
      <Sparkle className="absolute bottom-64 left-[4%] hidden size-3 text-ember lg:block" style={{ animationDelay: "1.7s" }} />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <Badge variant="roast" className="mx-auto mb-6 gap-2 px-4 py-1.5 text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-roast opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-roast" />
            </span>
            12,400+ people already cried
          </Badge>
        </motion.div>

        <div className="relative">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display mx-auto max-w-4xl text-5xl leading-[0.95] font-bold tracking-tighter uppercase sm:text-7xl"
          >
            Your YouTube history
            <br />
            is{" "}
            <span className="relative inline-block text-roast">
              embarrassing.
              <Squiggle className="absolute -bottom-1 left-0" />
            </span>
            <br />
            <span className="text-gradient-roast">Let AI prove it.</span>
          </motion.h1>

          {/* rotating badge + flame, desktop dressing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 -right-4 hidden -translate-y-1/2 xl:block"
          >
            <SpinBadge className="size-32" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute top-6 -left-2 hidden xl:block"
          >
            <FlickerFlame className="h-24 w-20 -rotate-12" />
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Connect YouTube, AI reads your liked videos, subs &amp; playlists and cooks you with a{" "}
          <span className="font-roast-mono font-semibold text-toxic">Brain-Rot Score</span> + Red
          Flags + savage shareable card.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="roast" className="btn-shine group w-full sm:w-auto">
              <LogoMark className="size-5 transition-transform duration-300 group-hover:-rotate-12" idSuffix="hero-cta" />
              Connect YouTube &amp; Get Roasted
            </Button>
          </a>
          <a href="#demo" className="group w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Play className="transition-transform duration-300 group-hover:scale-125" /> See Demo Roast
            </Button>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <EyeOff className="size-3.5" /> No posting without permission
          </span>
          <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Read-only access
          </span>
          <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <Trash2 className="size-3.5" /> Delete anytime
          </span>
        </motion.div>

        {/* floating roast cards — hover straightens them */}
        <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
          {miniCards.map((c, i) => (
            <motion.div
              key={c.score}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{ rotate: c.rotate } as CSSProperties}
            >
              <div
                className="animate-float rounded-2xl border border-line bg-card p-5 sticker transition-colors hover:border-roast/40"
                style={{ animationDelay: `${i * 0.9}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-roast-mono text-3xl font-bold text-toxic">{c.score}</span>
                  <span className="rounded-full bg-toxic/15 px-2.5 py-1 font-roast-mono text-[10px] font-bold text-toxic">
                    {c.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/80">“{c.text}”</p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3 fill-toxic text-toxic" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#how"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="font-roast-mono mt-12 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-muted transition-colors hover:text-white"
        >
          SCROLL FOR TRAUMA
          <ArrowDown className="size-3.5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
