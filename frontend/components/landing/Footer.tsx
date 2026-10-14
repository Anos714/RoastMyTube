import { FolderGit2, AtSign, Mail, Globe } from "lucide-react";
import { Logo } from "./Logo";

const socials = [
  { label: "Email", href: "mailto:sainrahul374@gmail.com", Icon: Mail },
  { label: "X / Twitter", href: "https://x.com/RahulSain714", Icon: AtSign },
  { label: "GitHub Repo", href: "https://github.com/Anos714/RoastMyTube", Icon: FolderGit2 },
  { label: "Portfolio", href: "https://rahulxcode.vercel.app", Icon: Globe },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-8 sm:flex-row sm:px-6">
        <Logo compact idSuffix="footer" />
        <div className="text-center sm:text-left">
          <p className="text-xs text-muted">
            Made by{" "}
            <a
              href="https://rahulxcode.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-roast decoration-2 underline-offset-4 transition-colors hover:text-roast"
            >
              Rahul Sain
            </a>
            <span className="mx-2 text-line">|</span>
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <span className="mx-2 text-line">•</span>
            <a href="/terms" className="transition-colors hover:text-white">
              Terms
            </a>
          </p>
          <p className="mt-1.5 text-[11px] text-muted">
            Parody project. Not affiliated with YouTube or Google. Roasts are playful, PG-13.
          </p>
          <p className="font-roast-mono mt-1 text-[10px] tracking-[0.18em] text-muted/70">
            SET IN SPACE GROTESK &amp; INTER — NO TEMPLATES WERE HARMED
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              title={label}
              className="grid size-9 place-items-center rounded-lg transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            >
              <Icon className="size-4" />
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/rahulxcode/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="grid size-9 place-items-center rounded-lg transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
          >
            <span className="font-display text-sm font-bold tracking-tight">in</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
