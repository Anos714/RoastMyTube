import type { Metadata } from "next";
// Self-hosted fonts (Fontsource) — no runtime fetch to Google Fonts,
// so `next build` never depends on fonts.googleapis.com availability.
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoastMyTube — Get Brutally Roasted by AI Based on Your YouTube History",
  description:
    "Connect your YouTube account. Gemini AI reads your liked videos, subscriptions & playlists and cooks you with a Brain-Rot Score, Red Flags & shareable roast card.",
  keywords: ["youtube roast", "ai roast", "brain rot score", "gemini ai", "nextjs project"],
  openGraph: {
    title: "RoastMyTube — Your YouTube History Is Embarrassing",
    description: "Let AI prove it. Brain-Rot Score + Red Flags + savage roast card.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastMyTube — Let AI Cook You",
    description: "Connect YouTube. Get roasted. Share the trauma.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col bg-void text-white antialiased">
        {children}
        <Toaster theme="dark" position="bottom-center" toastOptions={{ style: { background: "#131313", border: "1px solid #262626" } }} />
      </body>
    </html>
  );
}
