import { FolderGit2, AtSign } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-8 sm:flex-row sm:px-6">
        <Logo compact idSuffix="footer" />
        <div className="text-center sm:text-left">
          <p className="text-[11px] text-muted">
            Parody project. Not affiliated with YouTube or Google. Roasts are playful, PG-13.
          </p>
          <p className="font-roast-mono mt-1 text-[10px] tracking-[0.18em] text-muted/70">
            SET IN SPACE GROTESK &amp; INTER — NO TEMPLATES WERE HARMED
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <a
            href="#top"
            aria-label="X"
            className="grid size-9 place-items-center rounded-lg transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
          >
            <AtSign className="size-4" />
          </a>
          <a
            href="#top"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-lg transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
          >
            <FolderGit2 className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
