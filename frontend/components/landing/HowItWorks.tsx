"use client";

import { motion } from "framer-motion";
import { LogIn, Clapperboard, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeading, Reveal, useSpot } from "./primitives";
import { useEffect, useState } from "react";

const steps = [
  {
    icon: LogIn,
    num: "01",
    title: "Login with Google",
    desc: "One-click OAuth. We ask for read-only YouTube access. Nothing posted, nothing deleted.",
  },
  {
    icon: Clapperboard,
    num: "02",
    title: "We stalk your likes & subs",
    desc: "Liked videos, top subscriptions, playlists — up to 25 items each to respect API quota.",
  },
  {
    icon: Flame,
    num: "03",
    title: "Gemini cooks you",
    desc: "Your taste goes into Gemini 1.5 Flash with a savage prompt. Out comes trauma + score.",
  },
];

export function HowItWorks() {
  const [val, setVal] = useState(0);
  const spot = useSpot<HTMLDivElement>();

  useEffect(() => {
    const t = setTimeout(() => setVal(94), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        index="01"
        kick="HOW IT WORKS"
        title={
          <>
            3 steps to <span className="text-gradient-roast">existential dread</span>
          </>
        }
      />

      <div className="relative mt-2 grid gap-4 md:grid-cols-3">
        {/* dashed connector, desktop only */}
        <div
          aria-hidden="true"
          className="absolute top-16 right-[16%] left-[16%] hidden border-t-2 border-dashed border-line md:block"
        />
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative"
          >
            <Card
              onMouseMove={spot}
              className="spotlight card-brutal group h-full transition-colors hover:border-roast/40"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-roast/15 text-roast transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <s.icon className="size-5" />
                  </span>
                  <span aria-hidden="true" className="ghost-num font-display text-5xl font-bold select-none">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-6">
        <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-roast-mono text-xs font-bold tracking-[0.25em] text-muted">
                LIVE DEMO — BRAIN-ROT METER
              </p>
              <p className="font-display mt-1 text-2xl font-bold">
                Average victim scores <span className="text-toxic tabular-nums">{val}/100</span>
              </p>
            </div>
            <span className="rounded-full bg-toxic px-3 py-1 font-roast-mono text-xs font-bold text-black">
              CLINICALLY OVERCOOKED
            </span>
          </div>
          <Progress value={val} className="mt-5 h-4" />
          <div className="font-roast-mono mt-2 flex justify-between text-[11px] text-muted">
            <span>ENLIGHTENED</span>
            <span>NORMIE</span>
            <span>COOKED</span>
            <span>LOST CAUSE</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
