"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-noise relative overflow-hidden rounded-3xl border border-roast/30 bg-gradient-to-br from-roast via-[#a30026] to-void p-10 text-center sm:p-16"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-toxic/20 blur-[100px]" />
        <Flame className="mx-auto size-12 text-white" />
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight uppercase sm:text-6xl">
          Ready to cry?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
          30 seconds. One login. A lifetime of being humbled by your own algorithm.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="toxic"
            size="lg"
            onClick={() => toast("Coming soon — auth wiring in next step 🔥")}
          >
            <Flame /> Get Roasted Now — It&apos;s Free
          </Button>
        </div>
        <p className="font-roast-mono mt-5 text-[11px] tracking-widest text-white/60">
          NO SIGNUP WALL • NO SPAM • JUST PAIN
        </p>
      </motion.div>
    </section>
  );
}
