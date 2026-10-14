import { Flame, FolderGit2, AtSign } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-roast">
            <Flame className="size-4 text-white" />
          </span>
          <span className="font-display text-sm font-bold">
            Roast<span className="text-roast">My</span>Tube
          </span>
          <span className="ml-2 text-xs text-muted">Built for fun + resume 💼</span>
        </div>
        <p className="text-center text-[11px] text-muted">
          Parody project. Not affiliated with YouTube or Google. Roasts are playful, PG-13.
        </p>
        <div className="flex items-center gap-4 text-muted">
          <a href="#top" aria-label="X" className="transition-colors hover:text-white">
            <AtSign className="size-4" />
          </a>
          <a href="#top" aria-label="GitHub" className="transition-colors hover:text-white">
            <FolderGit2 className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
