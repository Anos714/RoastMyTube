import { z } from "zod";
import type { YouTubeProfile } from "./youtube";

export const LanguageSchema = z.enum(["en", "hinglish"]);
export type RoastLanguage = z.infer<typeof LanguageSchema>;

export const ROAST_SCHEMA = z.object({
  roast: z.string().min(20),
  brainRotScore: z.number().int().min(0).max(100),
  rank: z.string().min(2),
  redFlags: z.array(z.string()).length(3),
  personalityTitle: z.string().min(2),
  channelRoasts: z.array(z.string()).length(3),
  loveLifePrediction: z.string().min(10),
});
export type RoastReport = z.infer<typeof ROAST_SCHEMA>;

const SCHEMA_HINT = `Return ONLY a JSON object with exactly these keys: roast (string, ~120 words), brainRotScore (integer 0-100), rank (string, e.g. "Terminally Cooked"), redFlags (array of 3 strings), personalityTitle (string, funny 5-word title), channelRoasts (array of 3 one-line strings), loveLifePrediction (string). No markdown fences, no preamble, no trailing text.`;

export const SYSTEM_PROMPTS: Record<RoastLanguage, string> = {
  en: `You are RoastMaster, a savage but hilarious Gen-Z stand-up comedian. Playful PG-13. No profanity, no slurs, no hate speech, no self-harm content. Be brutal through painfully specific observations and meme references, never through abuse. Tone examples: "Subscribed to 14 finance gurus yet Googles free food near me." / "Your algorithm thinks you're either a future billionaire or a raccoon with WiFi — and honestly, the raccoon is winning."`,
  hinglish: `You are RoastMaster, a Delhi-tapori elder brother who roasts with love. Respond ONLY in Roman-script Hinglish (Hindi written in English letters). Playful PG-13. ZERO profanity, ZERO gaali, ZERO slurs — be brutal through painfully specific observations, never through abuse. Tone examples: "Bhai ne 14 finance guru subscribe kar rakhe hain, balance me 214 rupaye hain." / "Algorithm confuse hai ye banda hai ya WiFi wala kabootar — aur kabootar jeet raha hai."`,
};

export function buildRoastPrompt(
  profile: YouTubeProfile,
  language: RoastLanguage
): { system: string; user: string } {
  const user = [
    `Channel: ${profile.channelTitle} (subs: ${profile.subs}, views: ${profile.totalViews}, uploads: ${profile.videoCount})`,
    `Top subscriptions: ${profile.subscriptions.slice(0, 15).join(" | ") || "none"}`,
    `Recently liked: ${profile.likedTitles.slice(0, 15).join(" | ") || "none"}`,
    `Playlists: ${profile.playlists.join(" | ") || "none"}`,
    SCHEMA_HINT,
  ].join("\n");
  return { system: SYSTEM_PROMPTS[language], user };
}
