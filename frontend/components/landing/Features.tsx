"use client";

import { motion } from "framer-motion";
import { Brain, TriangleAlert, Clapperboard, HeartCrack, ImageDown, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Brain-Rot Score",
    desc: "0–100 cooked-meter with ranks from Enlightened Monk to Lost Cause. Animated + shareable.",
  },
  {
    icon: TriangleAlert,
    title: "Red Flag Detector",
    desc: "Top 3 toxic traits extracted from your taste. Painfully accurate, hilariously specific.",
  },
  {
    icon: Clapperboard,
    title: "Channel Roasts",
    desc: "Every top subscription gets its own one-line execution. No channel is safe.",
  },
  {
    icon: HeartCrack,
    title: "Love-Life Prediction",
    desc: "What your playlists say about your dating life. Brutal honesty guaranteed.",
  },
  {
    icon: ImageDown,
    title: "Shareable Card Image",
    desc: "OG-image roast card for X / LinkedIn. Built for virality + resume bait.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-First",
    desc: "Read-only OAuth scopes. No storage by default, one-click delete anytime.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <p className="font-roast-mono text-xs font-bold tracking-[0.2em] text-roast">FEATURES</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight uppercase sm:text-5xl">
          Packed with <span className="text-gradient-roast">emotional damage</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.1 }}
          >
            <Card className="group h-full transition-colors hover:border-roast/50">
              <CardContent className="p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-white/5 text-toxic transition-colors group-hover:bg-roast/15 group-hover:text-roast">
                  <f.icon className="size-5" />
                </span>
                <h3 className="font-display mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
