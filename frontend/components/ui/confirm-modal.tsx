"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalPortal } from "@/components/ui/modal-portal";

/**
 * Centered confirm modal: blurred backdrop, closes on outside-click or Escape.
 */
export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  busy,
  busyLabel = "Working…",
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  busy: boolean;
  busyLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <ModalPortal>
      <AnimatePresence>
        {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.92, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-roast/40 bg-card"
          >
            <div className="hazard-stripes h-2" aria-hidden="true" />
            <div className="p-6 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-roast/15 text-roast">
                <TriangleAlert className="size-6" />
              </span>
              <p className="font-display mt-4 text-xl font-bold">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose} disabled={busy}>
                  Cancel
                </Button>
                <Button variant="roast" className="flex-1" onClick={onConfirm} disabled={busy}>
                  {busy ? busyLabel : confirmLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </ModalPortal>
  );
}
