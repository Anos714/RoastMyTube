"use client";

import { useRef, useState } from "react";
import { FileUp, ShieldCheck, X } from "lucide-react";
import type { TakeoutSummary } from "@/lib/i18n-roast";
import { toast } from "sonner";

interface TakeoutItem {
  title?: string;
  time?: string;
  subtitles?: { name?: string }[];
}

/**
 * God-mode: user drops Google Takeout YouTube history JSON(s).
 * Parsing happens 100% in the browser — only the small aggregate
 * (top terms/channels, counts) is ever sent to the server.
 * Takeout path: Google Takeout → My Activity → YouTube → history JSONs.
 */
export function TakeoutUpload({
  value,
  onChange,
}: {
  value: TakeoutSummary | null;
  onChange: (s: TakeoutSummary | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const parseFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    try {
      const searches = new Map<string, number>();
      const channels = new Map<string, number>();
      let lateNight = 0;
      let total = 0;

      for (const file of Array.from(files)) {
        const text = await file.text();
        const parsed: unknown = JSON.parse(text);
        const items: TakeoutItem[] = Array.isArray(parsed) ? parsed : [];
        for (const item of items) {
          const title = item.title ?? "";
          if (title.startsWith("Searched for ")) {
            const term = title.slice("Searched for ".length).trim();
            if (term) {
              searches.set(term, (searches.get(term) ?? 0) + 1);
              total++;
              const hour = new Date(item.time ?? "").getHours();
              if (hour >= 0 && hour < 5) lateNight++;
            }
          } else if (title.startsWith("Watched ")) {
            total++;
            const ch = item.subtitles?.[0]?.name?.trim();
            if (ch && !ch.startsWith("http")) channels.set(ch, (channels.get(ch) ?? 0) + 1);
            const hour = new Date(item.time ?? "").getHours();
            if (hour >= 0 && hour < 5) lateNight++;
          }
        }
      }

      if (total === 0) {
        toast("No watch/search entries found — wrong file? Need Takeout history JSON");
        return;
      }
      const top = (m: Map<string, number>, n: number) =>
        [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
      onChange({
        topSearches: top(searches, 12),
        topWatchedChannels: top(channels, 12),
        lateNightCount: lateNight,
        totalItems: total,
      });
      setFileName(
        Array.from(files).map((f) => f.name).join(", ").slice(0, 60)
      );
      toast(`God-mode armed — ${total} history items scanned locally`);
    } catch {
      toast("Couldn't parse that file — needs to be Takeout history JSON");
    }
  };

  if (value) {
    return (
      <div className="rounded-xl border border-toxic/40 bg-toxic/5 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-roast-mono text-[11px] font-bold tracking-[0.2em] text-toxic">
            GOD-MODE ARMED — {value.totalItems} ITEMS, {value.lateNightCount} AFTER MIDNIGHT
          </p>
          <button
            onClick={() => {
              onChange(null);
              setFileName("");
            }}
            aria-label="Remove Takeout data"
            className="grid size-7 shrink-0 place-items-center rounded-lg text-muted hover:bg-white/10 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
        {value.topSearches.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {value.topSearches.slice(0, 6).map((s) => (
              <span
                key={s}
                className="font-roast-mono rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
              >
                “{s.length > 32 ? s.slice(0, 32) + "…" : s}”
              </span>
            ))}
          </div>
        )}
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
          <ShieldCheck className="size-3.5 text-toxic" /> Parsed in your browser — raw history never
          uploaded. File: {fileName || "pasted data"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        multiple
        className="hidden"
        onChange={(e) => {
          void parseFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="group flex w-full items-center gap-3 rounded-xl border border-dashed border-line bg-void p-4 text-left transition-all hover:border-toxic/50"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-toxic/10 text-toxic transition-transform group-hover:scale-110">
          <FileUp className="size-5" />
        </span>
        <span>
          <span className="font-display block text-sm font-bold">
            God-mode: drop Takeout history <span className="text-toxic">(optional)</span>
          </span>
          <span className="mt-0.5 block text-xs text-muted">
            Google Takeout → My Activity → YouTube JSON. Real searches = lethal ammo. Parsed
            locally, never uploaded.
          </span>
        </span>
      </button>
    </div>
  );
}
