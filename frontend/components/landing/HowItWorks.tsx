"use client";

import { motion } from "framer-motion";
import { LogIn, Clapperboard, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const steps = [
  {
    icon: LogIn,
    step: "STEP 01",
    title: "Login with Google",
    desc: "One-click OAuth. We ask for read-only YouTube access. Nothing posted, nothing deleted.",
  },
  {
    icon: Clapperboard,
    step: "STEP 02",
    title: "We stalk your likes & subs",
    desc: "Liked videos, top subscriptions, playlists — up to 25 items each to respect API quota.",
  },
  {
    icon: Flame,
    step: "STEP 03",
    title: "Gemini cooks you",
    desc: "Your taste goes into Gemini 1.5 Flash with a savage prompt. Out comes trauma + score.",
  },
];

export function HowItWorks() {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVal(87), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <p className="font-roast-mono text-xs font-bold tracking-[0.2em] text-roast">
          HOW IT WORKS
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight uppercase sm:text-5xl">
          3 steps to <span className="text-gradient-roast">existential dread</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            <Card className="card-brutal h-full p-2">
              <CardContent className="p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-roast/15 text-roast">
                  <s.icon className="size-5" />
                </span>
                <p className="font-roast-mono mt-5 text-[11px] font-bold tracking-widest text-muted">
                  {s.step}
                </p>
                <h3 className="font-display mt-1 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 rounded-2xl border border-line bg-card p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-roast-mono text-xs font-bold tracking-widest text-muted">
              LIVE DEMO — BRAIN-ROT METER
            </p>
            <p className="font-display mt-1 text-2xl font-bold">
              Average victim scores <span className="text-toxic">87/100</span>
            </p>
          </div>
          <span className="rounded-full bg-toxic px-3 py-1 font-roast-mono text-xs font-bold text-black">
            TERMINALLY COOKED
          </span>
        </div>
        <Progress value={val} className="mt-5 h-4" />
        <div className="font-roast-mono mt-2 flex justify-between text-[11px] text-muted">
          <span>ENLIGHTENED</span>
          <span>NORMIE</span>
          <span>COOKED</span>
          <span>LOST CAUSE</span>
        </div>
      </motion.div>
    </section>
  );
}
