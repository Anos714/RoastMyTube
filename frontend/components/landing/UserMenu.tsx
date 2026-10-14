"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User, Flame, LogOut, ChevronDown } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { ModalPortal } from "@/components/ui/modal-portal";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open ]);

  if (!session) return null;
  const initial = (session.user.name ?? session.user.email ?? "?").charAt(0).toUpperCase();

  const items = [
    { href: "/roast", icon: Flame, label: "My Roasts" },
    { href: "/profile", icon: User, label: "Profile & Settings" },
  ];

  return (
    <div ref={boxRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 rounded-full border border-line bg-card p-1 pr-1.5 transition-all hover:border-roast/60",
          open && "border-roast/60"
        )}
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="size-7 rounded-full" />
        ) : (
          <span className="font-display grid size-7 place-items-center rounded-full bg-gradient-to-br from-roast to-ember text-sm font-bold">
            {initial}
          </span>
        )}
        <ChevronDown className={cn("size-3.5 text-muted transition-transform", open && "rotate-180")} />
      </button>

      {/* Menu stays anchored to the avatar (absolute is unaffected by the blur trap). */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-card shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <div className="border-b border-line px-4 py-3">
              <p className="font-display truncate text-sm font-bold">
                {session.user.name ?? "Victim"}
              </p>
              <p className="font-roast-mono truncate text-[11px] text-muted">
                {session.user.email}
              </p>
            </div>
            <div className="p-1.5">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <it.icon className="size-4 text-toxic" />
                  {it.label}
                </Link>
              ))}
              <button
                onClick={() => signOut()}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-roast transition-colors hover:bg-roast/10"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-catcher lives at body level: the blurred sticky header traps
          `fixed` descendants, so without the portal it never covers the page. */}
      <ModalPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
      </ModalPortal>
    </div>
  );
}
