"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Share2, RotateCcw, HeartCrack, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

function useCountUp(target: number, start: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);
  return v;
}

export function SampleRoast() {
  const [inView, setInView] = useState(false);
  const score = useCountUp(87, inView);
  const soon = () => toast("Coming soon — share image export in next step 📸");

  return (
    <section id="demo" className="border-y border-line bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <Badge variant="toxic" className="mb-4">
            <Flame className="size-3" /> SAMPLE ROAST — DEMO VICTIM
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
            This is what <span className="text-roast"> trauma </span> looks like
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            Static demo so recruiters can see the output without logging in. Real version uses live
            YouTube API + Gemini.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setInView(true)}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <Card className="card-brutal overflow-hidden">
            <div className="flex items-center justify-between border-b border-line bg-card2 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-roast to-ember font-display text-lg font-bold">
                  D
                </span>
                <div>
                  <p className="font-display font-bold">Demo Victim</p>
                  <p className="font-roast-mono text-[11px] text-muted">
                    @demo_victim • 2,314 videos liked
                  </p>
                </div>
              </div>
              <Badge variant="toxic">TERMINALLY COOKED</Badge>
            </div>

            <CardContent className="space-y-6 p-6 sm:p-8">
              <div>
                <div className="flex items-end justify-between">
                  <p className="font-roast-mono text-xs font-bold tracking-widest text-muted">
                    BRAIN-ROT SCORE
                  </p>
                  <p className="font-roast-mono text-4xl font-bold text-toxic">{score}/100</p>
                </div>
                <Progress value={score} className="mt-3" />
              </div>

              <div className="rounded-xl border border-roast/30 bg-roast/10 p-5">
                <p className="font-roast-mono text-[11px] font-bold tracking-widest text-roast">
                  PERSONALITY TITLE
                </p>
                <p className="font-display mt-1 text-xl font-bold">
                  “3AM Sigma Grinder Who Never Grinds”
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  Bro watches “How to make $10k/month” between Minecraft parkour compilations and
                  breakup playlists. Subscribed to 14 finance gurus yet Googles “free food near
                  me”. Your algorithm thinks you’re either a future billionaire or a raccoon with
                  WiFi — and honestly, the raccoon is winning.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Saves ‘gym motivation’ but skips leg day AND videos",
                  "Watches 2x speed but still understands nothing",
                  "Dating advice binges, still texts ‘hey’ with no follow-up",
                ].map((f, i) => (
                  <div key={i} className="rounded-xl border border-line bg-void p-4">
                    <TriangleAlert className="size-4 text-toxic" />
                    <p className="mt-2 text-xs leading-relaxed text-white/80">
                      <span className="font-bold text-toxic">Red flag #{i + 1}:</span> {f}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-line bg-void p-4 text-sm text-muted">
                <HeartCrack className="size-4 shrink-0 text-roast" />
                Love-life prediction: your watch history will stay “it’s complicated” until you stop
                falling for thumbnails.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="roast" className="flex-1" onClick={soon}>
                  <Share2 /> Share on X
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => toast("Re-roast queued 🔁 (demo)")}>
                  <RotateCcw /> Roast Me Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
