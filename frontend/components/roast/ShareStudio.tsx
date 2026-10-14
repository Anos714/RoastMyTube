"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, Share2, Copy, X, ImageDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareCard, SHARE_SIZES, type ShareData, type ShareVariant } from "./ShareCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ImgFormat = "png" | "jpg" | "webp" | "avif";

const MIME: Record<ImgFormat, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
};

const VARIANTS: ShareVariant[] = ["post", "square", "story"];
const FORMATS: { id: ImgFormat; label: string }[] = [
  { id: "png", label: "PNG" },
  { id: "jpg", label: "JPG" },
  { id: "webp", label: "WEBP" },
  { id: "avif", label: "AVIF" },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** PNG snapshot → canvas → target format blob. */
async function renderBlob(
  node: HTMLElement,
  variant: ShareVariant,
  format: ImgFormat
): Promise<Blob> {
  const { w, h } = SHARE_SIZES[variant];
  const dataUrl = await toPng(node, {
    width: w,
    height: h,
    style: { transform: "none", margin: "0" },
    pixelRatio: 1,
  });
  if (format === "png") {
    const res = await fetch(dataUrl);
    return await res.blob();
  }
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no-canvas");
  if (format === "jpg") {
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(img, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, MIME[format], 0.92)
  );
  if (!blob) throw new Error(`format-unsupported:${format}`);
  return blob;
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function ShareStudio({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: ShareData;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<ShareVariant>("post");
  const [format, setFormat] = useState<ImgFormat>("png");
  const [busy, setBusy] = useState(false);
  const { w, h } = SHARE_SIZES[variant];
  const previewScale = Math.min(1, 460 / w, variant === "story" ? 380 / h : 460 / h);

  const fileName = () =>
    `roastmytube-${variant}-${data.brainRotScore}.${format === "jpg" ? "jpg" : format}`;

  const withNode = async <T,>(fn: (node: HTMLElement) => Promise<T>): Promise<T | null> => {
    const node = nodeRef.current?.firstElementChild as HTMLElement | null;
    if (!node) {
      toast("Card not ready — try again");
      return null;
    }
    setBusy(true);
    try {
      return await fn(node);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.startsWith("format-unsupported")) {
        toast("This browser can't encode AVIF — use WebP instead");
      } else {
        toast("Export failed — try PNG");
      }
      return null;
    } finally {
      setBusy(false);
    }
  };

  const onDownload = () =>
    void withNode(async (node) => {
      const blob = await renderBlob(node, variant, format);
      download(blob, fileName());
      toast(`Downloaded ${fileName()}`);
    });

  const onShare = () =>
    void withNode(async (node) => {
      const blob = await renderBlob(node, variant, format);
      const file = new File([blob], fileName(), { type: blob.type });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My RoastMyTube roast" });
      } else {
        download(blob, fileName());
        toast("Native share unavailable — downloaded instead");
      }
    });

  const onCopy = () =>
    void withNode(async (node) => {
      const blob = await renderBlob(node, variant, "png");
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast("Image copied — paste it anywhere");
    });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-line bg-card p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold">
                Share the <span className="text-roast">trauma</span>
              </p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* preview */}
            <div className="mt-4 grid place-items-center overflow-hidden rounded-xl border border-line bg-void p-4">
              <div style={{ width: w * previewScale, height: h * previewScale }} className="overflow-hidden rounded-lg">
                <div style={{ transform: `scale(${previewScale})`, transformOrigin: "top left" }}>
                  <ShareCard data={data} variant={variant} />
                </div>
              </div>
            </div>

            {/* variant tabs */}
            <div className="mt-4 flex flex-wrap gap-2">
              {VARIANTS.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={cn(
                    "font-roast-mono rounded-full border px-3.5 py-1.5 text-[11px] font-bold tracking-widest transition-all",
                    variant === v
                      ? "border-roast bg-roast/15 text-white"
                      : "border-line text-muted hover:text-white"
                  )}
                >
                  {SHARE_SIZES[v].label}
                </button>
              ))}
            </div>

            {/* format tabs */}
            <div className="mt-2 flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={cn(
                    "font-roast-mono rounded-full border px-3.5 py-1.5 text-[11px] font-bold tracking-widest transition-all",
                    format === f.id
                      ? "border-toxic bg-toxic/15 text-toxic"
                      : "border-line text-muted hover:text-white"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button variant="roast" className="btn-shine flex-1" onClick={onDownload} disabled={busy}>
                <Download /> {busy ? "Rendering…" : `Download ${format.toUpperCase()}`}
              </Button>
              <Button variant="outline" className="flex-1" onClick={onShare} disabled={busy}>
                <Share2 /> Share
              </Button>
              <Button variant="outline" className="flex-1" onClick={onCopy} disabled={busy}>
                <Copy /> Copy
              </Button>
            </div>
            <p className="font-roast-mono mt-3 text-center text-[10px] tracking-[0.2em] text-muted">
              POST = X / LINKEDIN • SQUARE = INSTAGRAM • STORY = WHATSAPP STATUS
            </p>
          </motion.div>

          {/* off-screen render node (must paint, never display:none) */}
          <div
            ref={nodeRef}
            aria-hidden="true"
            style={{ position: "fixed", left: -10000, top: 0, pointerEvents: "none" }}
          >
            <ShareCard data={data} variant={variant} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Button that opens the ShareStudio for a given report. */
export function ShareButton({
  data,
  className,
  label = "Share roast",
}: {
  data: ShareData;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="roast" className={cn("btn-shine", className)} onClick={() => setOpen(true)}>
        <ImageDown /> {label}
      </Button>
      <ShareStudio open={open} onClose={() => setOpen(false)} data={data} />
    </>
  );
}
