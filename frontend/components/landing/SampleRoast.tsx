"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Share2, RotateCcw, HeartCrack, TriangleAlert } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/roast/ScoreGauge";
import { Typewriter } from "@/components/roast/Typewriter";
import { Reveal, Tilt, useSpot } from "./primitives";
import { toast } from "sonner";

const ROAST_TEXT =
  "Bro watches “How to make $10k/month” between Minecraft parkour compilations and breakup playlists. Subscribed to 14 finance gurus yet Googles “free food near me”. Your algorithm thinks you’re either a future billionaire or a raccoon with WiFi — and honestly, the raccoon is winning.";

const FLAGS = [
  "Saves ‘gym motivation’ but skips leg day AND videos",
  "Watches 2x speed but still understands nothing",
  "Dating advice binges, still texts ‘hey’ with no follow-up",
];

function useCountUp(target: number, start: boolean, resetKey: number) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    // First rAF tick fires with p≈0, so the counter resets naturally —
    // no synchronous setState needed here (react-hooks/set-state-in-effect).
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1500);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, resetKey]);
  return v;
}

export function SampleRoast() {
  const [started, setStarted] = useState(false);
  const [replay, setReplay] = useState(0);
  const score = useCountUp(87, started, replay);
  const spot = useSpot<HTMLDivElement>();
  const soon = () => toast("Coming soon — share image export in next step");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="demo" className="scroll-mt-20 border-y border-line bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <p className="font-roast-mono flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-roast">
              <span className="inline-block h-px w-8 bg-roast" />
              LIVE SAMPLE — 02
            </p>
            <h2 className="font-display mt-4 max-w-xl text-3xl font-bold tracking-tight uppercase sm:text-5xl">
              This is what <span className="text-roast">trauma</span> looks like
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Static demo so recruiters can see the output without logging in. Real version uses
              live YouTube API + Gemini.
            </p>
          </Reveal>
          <span
            aria-hidden="true"
            className="ghost-num font-display hidden shrink-0 text-7xl font-bold select-none sm:block lg:text-8xl"
          >
            02
          </span>
        </div>

        <Reveal y={36}>
          <Tilt max={5} className="mx-auto max-w-3xl">
            <div className="roast-ring" ref={rootRef}>
              <div
                onMouseMove={spot}
                className="spotlight overflow-hidden rounded-[1.3rem] bg-card"
              >
                {/* header */}
                <div className="flex items-center justify-between gap-3 border-b border-line bg-card2 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="relative">
                      <span className="animate-spin-slower absolute -inset-1.5 rounded-full border border-dashed border-toxic/50" aria-hidden="true" />
                      <span className="font-display grid size-10 place-items-center rounded-full bg-gradient-to-br from-roast to-ember text-lg font-bold">
                        D
                      </span>
                    </span>
                    <div>
                      <p className="font-display font-bold">Demo Victim</p>
                      <p className="font-roast-mono text-[11px] text-muted">
                        @demo_victim • 2,314 videos liked
                      </p>
                    </div>
                  </div>
                  <Badge variant="toxic" className="shrink-0">TERMINALLY COOKED</Badge>
                </div>

                <CardContent className="space-y-6 p-6 sm:p-8">
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <ScoreGauge score={score} />
                    <div className="min-w-0 flex-1">
                      <p className="font-roast-mono text-[11px] font-bold tracking-[0.25em] text-roast">
                        PERSONALITY TITLE
                      </p>
                      <p className="font-display mt-1 text-xl font-bold sm:text-2xl">
                        “3AM Sigma Grinder Who Never Grinds”
                      </p>
                      <Typewriter key={replay} text={ROAST_TEXT} start={started} />
                    </div>
                  </div>

                  {/* stamp */}
                  <div className="flex justify-end">
                    <motion.span
                      initial={{ scale: 1.8, opacity: 0, rotate: -24 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: -10 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 280, damping: 16, delay: 1.6 }}
                      className="font-roast-mono rounded-md border-2 border-toxic px-3 py-1 text-xs font-bold tracking-[0.2em] text-toxic"
                    >
                      CERTIFIED COOKED ✓
                    </motion.span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {FLAGS.map((f, i) => (
                      <motion.div
                        key={f}
                        initial={{ opacity: 0, x: -18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 + i * 0.18, duration: 0.45, ease: "easeOut" }}
                        className="group rounded-xl border border-line bg-void p-4 transition-all duration-300 hover:-translate-y-1 hover:border-toxic/50"
                      >
                        <TriangleAlert className="size-4 text-toxic transition-transform duration-300 group-hover:scale-125" />
                        <p className="mt-2 text-xs leading-relaxed text-white/80">
                          <span className="font-bold text-toxic">Red flag #{i + 1}:</span> {f}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-line bg-void p-4 text-sm text-muted">
                    <HeartCrack className="size-4 shrink-0 text-roast" />
                    Love-life prediction: your watch history will stay “it’s complicated” until you
                    stop falling for thumbnails.
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="roast" className="btn-shine flex-1" onClick={soon}>
                      <Share2 /> Share on X
                    </Button>
                    <Button
                      variant="outline"
                      className="group flex-1"
                      onClick={() => {
                        setStarted(true);
                        setReplay((r) => r + 1);
                      }}
                    >
                      <RotateCcw className="transition-transform duration-500 group-hover:-rotate-180" />
                      Roast Me Again
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Tilt>
        </Reveal>

        <Reveal delay={0.15} className="mt-6 text-center">
          <p className="font-roast-mono text-[11px] tracking-[0.2em] text-muted">
            PSST — HIT “ROAST ME AGAIN” TO WATCH IT RE-COOK HIM
          </p>
        </Reveal>
      </div>
    </section>
  );
}
