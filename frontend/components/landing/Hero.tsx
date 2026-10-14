"use client";

import { motion } from "framer-motion";
import { Flame, Play, ShieldCheck, EyeOff, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const miniCards = [
  { score: "92", tag: "LOST CAUSE", rotate: "-6deg", text: "Watches 3AM motivation at 3PM in bed." },
  { score: "87", tag: "TERMINALLY COOKED", rotate: "3deg", text: "Subscribed to 14 finance gurus. Still broke." },
  { score: "64", tag: "CHRONICALLY ONLINE", rotate: "-2deg", text: "Knows every lore. Touches no grass." },
];

export function Hero() {
  const soon = () => toast("Coming soon — connect YouTube in next step 🔥");

  return (
    <section id="top" className="bg-noise relative overflow-hidden">
      {/* glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-roast/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-40 -left-40 h-72 w-72 rounded-full bg-ember/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <Badge variant="roast" className="mx-auto mb-6 px-4 py-1.5 text-xs">
            <span className="size-2 animate-pulse rounded-full bg-roast" />
            👺 12,400+ people already cried
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display mx-auto max-w-4xl text-5xl leading-[0.95] font-bold tracking-tighter uppercase sm:text-7xl"
        >
          Your YouTube history
          <br />
          is <span className="text-roast">embarrassing.</span>
          <br />
          <span className="text-gradient-roast">Let AI prove it.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Connect YouTube, AI reads your liked videos, subs &amp; playlists and cooks you with a{" "}
          <span className="font-roast-mono text-toxic">Brain-Rot Score</span> + Red Flags + savage
          shareable card.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" variant="roast" onClick={soon} className="w-full sm:w-auto">
            <Flame /> Connect YouTube &amp; Get Roasted
          </Button>
          <a href="#demo" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Play /> See Demo Roast
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
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Read-only access
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Trash2 className="size-3.5" /> Delete anytime
          </span>
        </motion.div>

        {/* floating cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {miniCards.map((c, i) => (
            <motion.div
              key={c.score}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{ "--float-rotate": c.rotate } as React.CSSProperties}
              className="animate-float rounded-2xl border border-line bg-card p-5 text-left sticker"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
