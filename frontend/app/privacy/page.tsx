import type { Metadata } from "next";
import { Logo } from "@/components/landing/Logo";
import { BackButton } from "@/components/ui/back-button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Reveal } from "@/components/landing/primitives";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How RoastMyTube collects, uses, stores, and deletes your Google account and YouTube data.",
  alternates: { canonical: "/privacy" },
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-10 text-xl font-bold tracking-tight">{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{children}</li>;
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-void text-white">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <div className="mb-8 flex items-center justify-between gap-4">
          <Logo href="/" idSuffix="privacy" />
          <BackButton />
        </div>
        <p className="font-roast-mono text-xs font-bold tracking-[0.25em] text-roast">
          LEGAL — PRIVACY POLICY
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight uppercase sm:text-5xl">
          Privacy <span className="text-gradient-roast">Policy</span>
        </h1>
        <p className="font-roast-mono mt-3 text-xs text-muted">
          LAST UPDATED: OCTOBER 2026
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <P>
          RoastMyTube (“we”, “the app”) generates humorous AI roasts based on your public YouTube
          activity. This policy explains exactly what data we touch, why, where it goes, and how
          you delete it.
        </P>

        <H>1. Data we collect</H>
        <ul className="list-disc pl-5">
          <Li>
            <strong className="text-white">Google account basics:</strong> name, email address, and
            profile photo — provided by Google when you sign in.
          </Li>
          <Li>
            <strong className="text-white">YouTube read-only data</strong> (scope{" "}
            <span className="font-roast-mono text-xs">youtube.readonly</span>): channel statistics,
            subscription names, liked video titles, and playlist names. We request{" "}
            <strong className="text-white">read-only</strong> access — the app cannot post,
            delete, like, or modify anything on your account.
          </Li>
          <Li>
            <strong className="text-white">Roast reports:</strong> the AI-generated roast text,
            score, and language you chose, linked to your account so you can view history.
          </Li>
          <Li>
            <strong className="text-white">OAuth tokens:</strong> Google access and refresh tokens,
            stored so the app can fetch YouTube data without asking you to log in every time.
          </Li>
          <Li>
            <strong className="text-white">Takeout uploads (optional):</strong> if you use God-mode,
            your Takeout JSON is parsed <strong className="text-white">entirely in your
            browser</strong>. Only the small aggregate (top search terms, top channels, counts) is
            sent to our server. Your raw history file never leaves your device.
          </Li>
        </ul>

        <H>2. How we use it</H>
        <P>
          Your YouTube data is used for one purpose only: generating the roast report you asked
          for. We do not profile you for advertising, sell data, or use it to train models.
        </P>

        <H>3. Who else sees your data</H>
        <ul className="list-disc pl-5">
          <Li>
            <strong className="text-white">Groq</strong> (primary AI provider) and{" "}
            <strong className="text-white">Google Gemini</strong> (fallback) — your YouTube
            summary is sent to them as the roast prompt. See their respective privacy policies.
          </Li>
          <Li>
            <strong className="text-white">Neon</strong> (Postgres host) and{" "}
            <strong className="text-white">Vercel</strong> (app host) — infrastructure only.
          </Li>
          <Li>
            We share data with <strong className="text-white">no one else</strong>, for{" "}
            <strong className="text-white">no other reason</strong>.
          </Li>
        </ul>

        <H>4. Data retention &amp; deletion</H>
        <ul className="list-disc pl-5">
          <Li>
            <strong className="text-white">Delete roast history</strong> anytime from Profile →
            Danger Zone.
          </Li>
          <Li>
            <strong className="text-white">Disconnect YouTube</strong> anytime from Profile → Danger
            Zone. This revokes our Google access token and deletes the stored account credentials —
            next login asks for consent again.
          </Li>
          <Li>
            For full account deletion (user + sessions + all reports), email us at{" "}
            <a href="mailto:sainrahul374@gmail.com" className="text-roast underline underline-offset-4">
              sainrahul374@gmail.com
            </a>{" "}
            and we will delete everything within 7 days.
          </Li>
        </ul>

        <H>5. Security</H>
        <P>
          All traffic runs over HTTPS. API keys and OAuth secrets live only in server-side
          environment variables — never in client code. Databases are hosted on managed,
          access-controlled infrastructure (Neon). No system is perfect; if you suspect an issue,
          email us immediately.
        </P>

        <H>6. Children</H>
        <P>
          The app is not directed at children under 13, and we do not knowingly collect their data.
        </P>

        <H>7. Changes to this policy</H>
        <P>
          If this policy changes materially, we will update the “Last updated” date above. Continued
          use of the app means you accept the updated policy.
        </P>

        <H>8. Contact</H>
        <P>
          Rahul Sain —{" "}
          <a href="mailto:sainrahul374@gmail.com" className="text-roast underline underline-offset-4">
            sainrahul374@gmail.com
          </a>
        </P>
      </Reveal>
      </div>
      <Footer />
    </div>
  );
}
