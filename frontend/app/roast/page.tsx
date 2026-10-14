"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  RotateCcw,
  TriangleAlert,
  HeartCrack,
  LogOut,
  History,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LogoMark } from "@/components/landing/Logo";
import { ScoreGauge } from "@/components/roast/ScoreGauge";
import { Typewriter } from "@/components/roast/Typewriter";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Report {
  roast: string;
  brainRotScore: number;
  rank: string;
  redFlags: string[];
  personalityTitle: string;
  channelRoasts: string[];
  loveLifePrediction: string;
  language: string;
  hinglish_blocked?: boolean;
}

interface HistoryRow {
  id: string;
  language: string;
  brainRotScore: number | null;
  createdAt: string;
  report: Report;
}

type Phase = "idle" | "loading" | "done" | "error";

const LOADING_STEPS = [
  "Stalking your liked videos…",
  "Judging your subscriptions…",
  "Reading playlists you forgot existed…",
  "Calculating brain damage…",
  "Sharpening the knives…",
];

const ERROR_COPY: Record<string, { title: string; sub: string; action: string }> = {
  relogin: {
    title: "Google session expired",
    sub: "Your YouTube token died. Sign out and sign back in to resurrect it.",
    action: "Sign in again",
  },
  quota: {
    title: "YouTube quota over for today",
    sub: "Google allows limited free API calls per day. Come back tomorrow — the roast will wait.",
    action: "Try demo instead",
  },
  slow_down: {
    title: "Roast machine overheating",
    sub: "Too many requests. Give it a minute to cool down.",
    action: "Retry",
  },
  roast_failed: {
    title: "AI refused to cook",
    sub: "The model choked. Happens to the best of us. One more try?",
    action: "Retry",
  },
  empty: {
    title: "Nothing to roast",
    sub: "Your account has no likes, subs or playlists. Even AI needs material.",
    action: "Try demo instead",
  },
};

export default function RoastPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [lang, setLang] = useState<"en" | "hinglish">("en");
  const [phase, setPhase] = useState<Phase>("idle");
  const [report, setReport] = useState<Report | null>(null);
  const [errCode, setErrCode] = useState<string>("roast_failed");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/roast/history");
      if (res.ok) setHistory(await res.json());
    } catch {
      /* history is bonus — never block the roast */
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    // Async boundary: setState happens after await, not in the effect body.
    void (async () => {
      try {
        const res = await fetch("/api/roast/history");
        if (!cancelled && res.ok) setHistory(await res.json());
      } catch {
        /* history is bonus — never block the roast */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setInterval(() => setStep((s) => (s + 1) % LOADING_STEPS.length), 1400);
    return () => clearInterval(t);
  }, [phase]);

  const start = async () => {
    setPhase("loading");
    setStep(0);
    setReport(null);
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrCode(data.error ?? "roast_failed");
        setPhase("error");
        return;
      }
      setReport(data);
      setReplay((r) => r + 1);
      setPhase("done");
      loadHistory();
    } catch {
      setErrCode("roast_failed");
      setPhase("error");
    }
  };

  const errorAction = () => {
    if (errCode === "relogin") {
      signOut();
      router.push("/login");
    } else if (errCode === "quota" || errCode === "empty") {
      router.push("/#demo");
    } else {
      start();
    }
  };

  const share = async () => {
    if (!report) return;
    const text = `${report.personalityTitle} — Brain-Rot ${report.brainRotScore}/100 (${report.rank}). Roasted by RoastMyTube.`;
    try {
      await navigator.clipboard.writeText(text);
      toast("Roast copied — go embarrass yourself publicly");
    } catch {
      toast("Copy failed — screenshot it like it's 2012");
    }
  };

  if (isPending) {
    return (
      <main className="grid min-h-screen place-items-center">
        <Loader2 className="size-8 animate-spin text-roast" />
      </main>
    );
  }
  if (!session) return null;

  const err = ERROR_COPY[errCode] ?? ERROR_COPY.roast_failed;

  return (
    <div className="flex min-h-screen flex-col bg-void text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        {/* header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-roast-mono text-[11px] tracking-[0.25em] text-muted">
              VICTIM: {session.user.email?.toUpperCase()}
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold tracking-tight uppercase sm:text-4xl">
              The <span className="text-gradient-roast">furnace</span> awaits
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut /> Sign out
          </Button>
        </div>

        {/* language toggle */}
        <div className="mt-6 flex items-center gap-2">
          {(["en", "hinglish"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "font-roast-mono rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest transition-all",
                lang === l
                  ? "border-roast bg-roast/15 text-white"
                  : "border-line text-muted hover:border-white/30 hover:text-white"
              )}
            >
              {l === "en" ? "ENGLISH" : "HINGLISH"}
            </button>
          ))}
          <span className="font-roast-mono ml-1 hidden text-[11px] text-muted sm:block">
            {lang === "en" ? "Corporate-friendly savagery" : "Bhaiyo wali tapori, PG-13"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-6 rounded-2xl border border-dashed border-line bg-card p-10 text-center"
            >
              <LogoMark className="mx-auto size-14" idSuffix="roast-idle" />
              <p className="font-display mt-4 text-xl font-bold">
                One click. Zero mercy.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                We&apos;ll pull your likes, subs &amp; playlists and hand them to AI with one
                instruction: no survivors.
              </p>
              <Button size="lg" variant="roast" onClick={start} className="btn-shine mt-6">
                <LogoMark className="size-5" idSuffix="roast-go" />
                Roast me in {lang === "en" ? "English" : "Hinglish"}
              </Button>
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-line bg-card p-10 text-center"
            >
              <Loader2 className="mx-auto size-10 animate-spin text-roast" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-display mt-5 text-lg font-bold"
                >
                  {LOADING_STEPS[step]}
                </motion.p>
              </AnimatePresence>
              <div className="mx-auto mt-5 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-roast via-ember to-toxic"
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "40%" }}
                />
              </div>
            </motion.div>
          )}

          {phase === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-roast/40 bg-roast/5 p-10 text-center"
            >
              <p className="font-display text-2xl font-bold">{err.title}</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">{err.sub}</p>
              <Button variant="roast" onClick={errorAction} className="mt-6">
                <RotateCcw /> {err.action}
              </Button>
            </motion.div>
          )}

          {phase === "done" && report && (
            <motion.div
              key={`done-${replay}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <div className="roast-ring">
                <div className="overflow-hidden rounded-[1.3rem] bg-card">
                  <div className="flex items-center justify-between gap-3 border-b border-line bg-card2 px-6 py-4">
                    <div>
                      <p className="font-display font-bold">Your Roast Report</p>
                      <p className="font-roast-mono text-[11px] text-muted">
                        {report.language === "hinglish" ? "HINGLISH MODE" : "ENGLISH MODE"} • FRESH OUT THE OVEN
                      </p>
                    </div>
                    <Badge variant="toxic">{report.rank.toUpperCase()}</Badge>
                  </div>
                  <div className="space-y-6 p-6 sm:p-8">
                    {report.hinglish_blocked && (
                      <p className="rounded-xl border border-toxic/40 bg-toxic/10 p-3 text-xs text-toxic">
                        Bhai zyada cook ho gaya tha — AI ne Hinglish me bolne se mana kar diya, to
                        English me sun.
                      </p>
                    )}
                    <div className="flex flex-col items-center gap-6 sm:flex-row">
                      <ScoreGauge score={report.brainRotScore} />
                      <div className="min-w-0 flex-1">
                        <p className="font-roast-mono text-[11px] font-bold tracking-[0.25em] text-roast">
                          PERSONALITY TITLE
                        </p>
                        <p className="font-display mt-1 text-xl font-bold sm:text-2xl">
                          “{report.personalityTitle}”
                        </p>
                        <Typewriter key={replay} text={report.roast} start />
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {report.redFlags.map((f, i) => (
                        <div key={i} className="rounded-xl border border-line bg-void p-4">
                          <TriangleAlert className="size-4 text-toxic" />
                          <p className="mt-2 text-xs leading-relaxed text-white/80">
                            <span className="font-bold text-toxic">Red flag #{i + 1}:</span> {f}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-line bg-void p-4 text-sm text-muted">
                      <p className="font-roast-mono mb-2 text-[11px] font-bold tracking-[0.25em] text-roast">
                        CHANNEL EXECUTIONS
                      </p>
                      {report.channelRoasts.map((c, i) => (
                        <p key={i} className="mt-1 text-sm text-white/80">
                          • {c}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-line bg-void p-4 text-sm text-muted">
                      <HeartCrack className="size-4 shrink-0 text-roast" />
                      {report.loveLifePrediction}
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button variant="roast" className="btn-shine flex-1" onClick={share}>
                        <Share2 /> Copy roast
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={start}>
                        <RotateCcw /> Roast me again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* history */}
        {history.length > 0 && (
          <div className="mt-10">
            <p className="font-roast-mono flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-muted">
              <History className="size-3.5" /> PAST TRAUMA ({history.length})
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {history.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setReport(h.report);
                    setReplay((r) => r + 1);
                    setPhase("done");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-xl border border-line bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-roast/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-roast-mono text-2xl font-bold text-toxic">
                      {h.brainRotScore ?? "—"}
                    </span>
                    <span className="font-roast-mono text-[10px] tracking-widest text-muted">
                      {(h.language ?? "en").toUpperCase()} •{" "}
                      {new Date(h.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="font-display mt-1 truncate text-sm font-bold">
                    {(h.report as Report)?.personalityTitle ?? "Roast"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
