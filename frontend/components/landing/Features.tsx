"use client";

import { Brain, TriangleAlert, Clapperboard, HeartCrack, ImageDown, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading, Reveal, useSpot } from "./primitives";

const features = [
  {
    icon: Brain,
    num: "01",
    title: "Brain-Rot Score",
    desc: "0–100 cooked-meter with ranks from Enlightened Monk to Lost Cause. Animated + shareable.",
  },
  {
    icon: TriangleAlert,
    num: "02",
    title: "Red Flag Detector",
    desc: "Top 3 toxic traits extracted from your taste. Painfully accurate, hilariously specific.",
  },
  {
    icon: Clapperboard,
    num: "03",
    title: "Channel Roasts",
    desc: "Every top subscription gets its own one-line execution. No channel is safe.",
  },
  {
    icon: HeartCrack,
    num: "04",
    title: "Love-Life Prediction",
    desc: "What your playlists say about your dating life. Brutal honesty guaranteed.",
  },
  {
    icon: ImageDown,
    num: "05",
    title: "Shareable Card Image",
    desc: "OG-image roast card for X / LinkedIn. Built for virality + resume bait.",
  },
  {
    icon: ShieldCheck,
    num: "06",
    title: "Privacy-First",
    desc: "Read-only OAuth scopes. No storage by default, one-click delete anytime.",
  },
];

export function Features() {
  const spot = useSpot<HTMLDivElement>();

  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        index="03"
        kick="THE ARSENAL"
        title={
          <>
            Packed with <span className="text-gradient-roast">emotional damage</span>
          </>
        }
        sub="Every feature exists for one reason: a roast so specific you can't help but share it."
      />

      <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.1} y={24}>
            <Card
              onMouseMove={spot}
              className="spotlight group h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-roast/50 hover:shadow-[0_16px_50px_rgba(255,0,51,0.15)]"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-white/5 text-toxic transition-all duration-300 group-hover:scale-110 group-hover:bg-roast/15 group-hover:text-roast">
                    <f.icon className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
                  </span>
                  <span aria-hidden="true" className="font-roast-mono text-xs font-bold text-line transition-colors group-hover:text-muted">
                    /{f.num}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
