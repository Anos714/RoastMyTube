"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is RoastMyTube free?",
    a: "100% free. It runs on free API quotas — YouTube allows ~2,000 roasts/day and the AI side ~1,000/day. No card, no paywall, no premium tier. Just pain, free of charge.",
  },
  {
    q: "Can it post or delete anything on my YouTube?",
    a: "No. It asks for read-only access (youtube.readonly scope) — it can look at your subs, likes and playlists, but it physically cannot post, delete, like, or modify anything. The permission screen itself says so.",
  },
  {
    q: "Do you store my watch history?",
    a: "We never even receive it — the YouTube API doesn't expose watch or search history to anyone. Liked videos and subs are fetched fresh for each roast. Only the finished roast report is saved so you can revisit it, and you can wipe it anytime from Profile → Danger Zone.",
  },
  {
    q: "What is the Brain-Rot Score?",
    a: "A 0–100 meter of how cooked your taste is, judged by an AI with zero mercy. Under 40 you're a functioning human. Above 85 you're clinically overcooked. The gauge, the rank, and the certificate are all shareable.",
  },
  {
    q: "English or Hinglish — which roast hits harder?",
    a: "Both are brutal, different weapons. English is Gen-Z stand-up savagery; Hinglish is a Delhi-tapori elder brother roasting you with love. Toggle on the roast page and compare your trauma in two languages.",
  },
  {
    q: "Why does Google say 'unverified app' during login?",
    a: "The app is in Google's testing mode (max 100 hand-added users) until verification completes. Your data handling doesn't change — read-only access, nothing stored without reason. Verification is in progress for public launch.",
  },
  {
    q: "How do I delete my data?",
    a: "Profile → Danger Zone: wipe roast history, disconnect YouTube (revokes Google access), or delete the entire account. No emails to support, no 30-day dark patterns — one click each.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        index="04"
        kick="DOUBTS, ROASTED"
        title={
          <>
            Questions? <span className="text-gradient-roast">Good. Read.</span>
          </>
        }
        sub="Everything people ask before handing their watch history to a judging machine."
      />

      {/* SEO: structured data so Google can lift these into search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <div className="mx-auto mt-2 max-w-3xl">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.05} y={16}>
              <div
                className={cn(
                  "mb-3 overflow-hidden rounded-2xl border transition-colors duration-300",
                  isOpen ? "border-roast/50 bg-card" : "border-line bg-card/60 hover:border-white/20"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                >
                  <span className="font-roast-mono shrink-0 text-xs font-bold text-roast">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display flex-1 text-base font-bold sm:text-lg">{f.q}</h3>
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-roast bg-roast/15 text-roast"
                        : "border-line text-muted"
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <p className="px-5 pb-6 pl-[3.75rem] text-sm leading-relaxed text-muted sm:px-6 sm:text-[15px]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-8 text-center">
        <p className="font-roast-mono text-[11px] tracking-[0.2em] text-muted">
          STILL CONFUSED? THAT&apos;S PROBABLY WHY YOUR SCORE IS HIGH
        </p>
      </Reveal>
    </section>
  );
}
