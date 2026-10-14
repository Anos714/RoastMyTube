import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SampleRoast } from "@/components/landing/SampleRoast";
import { Features } from "@/components/landing/Features";
import { Faq } from "@/components/landing/Faq";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-void text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <HowItWorks />
        <SampleRoast />
        <Features />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
