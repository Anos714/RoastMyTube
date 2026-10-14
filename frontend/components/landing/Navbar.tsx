"use client";

import { useEffect, useState } from "react";
import { FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark, Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const links = [
  { label: "How it works", href: "/#how" },
  { label: "Sample Roasts", href: "/#demo" },
  { label: "Features", href: "/#features" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300",
        scrolled ? "border-line bg-void/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : "border-transparent bg-void/60"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <Logo idSuffix="nav" />

        <div className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Anos714/RoastMyTube"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="grid size-10 place-items-center rounded-xl text-muted transition-colors hover:bg-white/10 hover:text-white"
          >
            <FolderGit2 className="size-5" />
          </a>
          {!isPending && session ? (
            <UserMenu />
          ) : (
            <a href="/login">
              <Button
                variant="roast"
                size="sm"
                className="btn-shine sm:h-10 sm:px-5 sm:text-sm"
              >
                <LogoMark className="size-4" idSuffix="nav-cta" />
                Get Roasted
              </Button>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
