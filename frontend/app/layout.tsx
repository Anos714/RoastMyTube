import type { Metadata, Viewport } from "next";
// Self-hosted fonts (Fontsource) — no runtime fetch to Google Fonts,
// so `next build` never depends on fonts.googleapis.com availability.
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import { Toaster } from "sonner";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RoastMyTube — Get Brutally Roasted by AI Based on Your YouTube History",
    template: "%s | RoastMyTube",
  },
  description:
    "Connect your YouTube account. AI reads your liked videos, subscriptions & playlists and cooks you with a Brain-Rot Score, Red Flags & shareable roast card. English + Hinglish.",
  keywords: [
    "youtube roast",
    "ai roast",
    "brain rot score",
    "hinglish roast",
    "gemini ai",
    "groq",
    "nextjs project",
  ],
  authors: [{ name: "Rahul Sain", url: "https://rahulxcode.vercel.app" }],
  creator: "Rahul Sain",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "RoastMyTube — Your YouTube History Is Embarrassing",
    description: "Let AI prove it. Brain-Rot Score + Red Flags + savage roast card.",
    url: "/",
    siteName: "RoastMyTube",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastMyTube — Let AI Cook You",
    description: "Connect YouTube. Get roasted. Share the trauma.",
    creator: "@RahulSain714",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col bg-void text-white antialiased">
        {/* GEO: site identity for AI engines and rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "RoastMyTube",
                  url: siteUrl,
                  description:
                    "AI roasts based on your YouTube history. Brain-Rot Score, red flags and shareable roast cards in English + Hinglish.",
                  inLanguage: "en",
                },
                {
                  "@type": "Organization",
                  name: "RoastMyTube",
                  url: siteUrl,
                  founder: {
                    "@type": "Person",
                    name: "Rahul Sain",
                    url: "https://rahulxcode.vercel.app",
                  },
                },
              ],
            }),
          }}
        />
        {children}
        <Toaster theme="dark" position="bottom-center" toastOptions={{ style: { background: "#131313", border: "1px solid #262626" } }} />
      </body>
    </html>
  );
}
