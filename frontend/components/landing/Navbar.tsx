"use client";

import { Flame, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Sample Roasts", href: "#demo" },
  { label: "Features", href: "#features" },
];

export function Navbar() {
  const soon = () => toast("Coming soon — auth wiring in next step 🔥");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-void/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-roast shadow-[0_0_24px_rgba(255,0,51,0.5)]">
            <Flame className="size-5 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Roast<span className="text-roast">My</span>Tube
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={soon} aria-label="GitHub">
            <FolderGit2 className="size-5" />
          </Button>
          <Button variant="roast" size="sm" className="sm:h-10 sm:px-5 sm:text-sm" onClick={soon}>
            Get Roasted 🔥
          </Button>
        </div>
      </nav>
    </header>
  );
}
