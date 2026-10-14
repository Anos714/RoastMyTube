"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/ui/back-button";
import { motion } from "framer-motion";
import { Play, ShieldCheck, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { Sparkle } from "@/components/landing/decorations";
import { signIn, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session) router.replace("/roast");
  }, [isPending, session, router]);

  const login = () =>
    signIn.social(
      { provider: "google", callbackURL: "/roast" },
      {
        onError: () => {
          toast("Login failed — try again");
        },
      }
    );

  return (
    <main className="bg-noise relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-roast/20 blur-[140px]" />
      <Sparkle className="absolute top-24 left-[12%] size-4 text-toxic" />
      <Sparkle className="absolute right-[14%] bottom-24 size-5 text-roast" style={{ animationDelay: "1.2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="rounded-3xl border border-line bg-card p-8 text-center sm:p-10">
        <div className="flex justify-center">
          <Logo idSuffix="login" />
        </div>
        <h1 className="font-display mt-6 text-3xl font-bold tracking-tight uppercase">
          Prove you&apos;re <span className="text-roast">not cooked</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Spoiler: you are. Connect YouTube and let AI read your liked videos, subs &amp;
          playlists.
        </p>

        <Button
          size="lg"
          variant="roast"
          onClick={login}
          disabled={isPending}
          className="btn-shine mt-7 w-full"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M21.35 11.1H12v2.9h5.35c-.5 2.4-2.55 3.5-5.35 3.5a5.9 5.9 0 0 1 0-11.8c1.5 0 2.85.55 3.9 1.45l2.05-2.05A8.75 8.75 0 1 0 12 20.75c4.4 0 7.9-3.05 7.9-7.9 0-.25-.05-.5-.1-.75h1.55v-1z"
            />
          </svg>
          {isPending ? "Checking session…" : "Continue with Google"}
        </Button>

        <div className="mt-5 space-y-2 text-left text-xs text-muted">
          <p className="flex items-center gap-2">
            <EyeOff className="size-3.5 shrink-0 text-toxic" /> Read-only access — we can&apos;t post or delete anything
          </p>
          <p className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-toxic" /> Tokens stored securely, one-click disconnect anytime
          </p>
          <p className="flex items-center gap-2">
            <Trash2 className="size-3.5 shrink-0 text-toxic" /> Your history is never stored — only the roast report
          </p>
        </div>

        <Link
          href="/#demo"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <Play className="size-4" /> Not convinced? See a demo roast first
        </Link>
        </div>
      </motion.div>
    </main>
  );
}
