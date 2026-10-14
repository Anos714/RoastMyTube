"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/** History-aware back button: goes back when possible, else to fallback. */
export function BackButton({
  label = "Back",
  fallback = "/",
}: {
  label?: string;
  fallback?: string;
}) {
  const router = useRouter();
  const go = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };
  return (
    <button
      onClick={go}
      className="font-roast-mono group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-muted transition-colors hover:text-white"
    >
      <span className="grid size-8 place-items-center rounded-lg border border-line transition-all group-hover:-translate-x-0.5 group-hover:border-roast/60 group-hover:text-roast">
        <ArrowLeft className="size-4" />
      </span>
      {label.toUpperCase()}
    </button>
  );
}
