"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./Logo";
import { EmberField, Sparkle } from "./decorations";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-noise relative overflow-hidden rounded-3xl border border-roast/30 bg-gradient-to-br from-roast via-[#a30026] to-void p-10 text-center sm:p-16"
      >
        <EmberField />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-toxic/20 blur-[100px]" />
        <Sparkle className="absolute top-8 left-[12%] size-4 text-toxic" />
        <Sparkle className="absolute right-[14%] bottom-10 size-5 text-white/70" style={{ animationDelay: "1.3s" }} />

        <motion.div
          initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
        >
          <LogoMark className="mx-auto size-16 drop-shadow-[0_0_30px_rgba(255,212,0,0.35)]" idSuffix="cta" />
        </motion.div>
        <h2 className="font-display mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight uppercase sm:text-6xl">
          Ready to cry?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
          30 seconds. One login. A lifetime of being humbled by your own algorithm.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/login">
            <Button
              variant="toxic"
              size="lg"
              className="btn-shine group w-full sm:w-auto"
            >
              <LogoMark className="size-5 transition-transform duration-300 group-hover:-rotate-12" idSuffix="cta-btn" />
              Get Roasted Now — It&apos;s Free
            </Button>
          </a>
        </div>
        <p className="font-roast-mono mt-5 text-[11px] tracking-[0.25em] text-white/60">
          NO SIGNUP WALL • NO SPAM • JUST PAIN
        </p>
      </motion.div>
    </section>
  );
}
