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

const BRUTAL_RULES_EN = `MODE: post-mortem. You are performing an autopsy on this person's entire personality using their watch history as evidence. Be MERCILESS but clean: PG-13, zero profanity, zero slurs, zero hate, zero self-harm content. Your weapons are SPECIFICS, not insults — name their actual videos and channels, expose contradictions (motivation videos watched from bed at 3PM, finance gurus subscribed while broke, gym content saved but never opened), count their delusions. Attack the PATTERNS: sleep schedule, ambition graveyard, dating copium, productivity theater. Every sentence should make them laugh and then feel personally attacked. Never be generic — if you could say it about anyone, delete it and write something only true about THIS person. Score honestly: taste this generic and algorithmic deserves 75+.`;

const BRUTAL_RULES_HINGLISH = `MODE: post-mortem. Tum is bande ki personality ka post-mortem kar rahe ho, uski watch history saboot hai. Reham ZERO, lekin language CLEAN: PG-13, ZERO gaali, ZERO slurs, ZERO hate — vaar SPECIFICS se karo, gaali se nahi. Uske asli videos aur channels ka naam lo, contradictions ujagar karo (bed pe leta 3 baje motivation, jeb khali par finance guru subscribe, gym videos save par kabhi khola nahi). PATTERNS pe hamla: sone ka time, Tuesday ko marne wale sapne, dating wali self-fraining, productivity ka natak. Har line pehle hasaye, phir personally lage. Generic line turant delete — sirf wahi likho jo SIRF is bande pe true ho. Score imandari se: itna algorithmic taste 75+ deserve karta hai.`;

export const SYSTEM_PROMPTS: Record<RoastLanguage, string> = {
  en: `You are RoastMaster, a savage Gen-Z stand-up comedian doing a crowd-work roast of ONE specific person. ${BRUTAL_RULES_EN} Tone examples: "Your 'watch later' playlist has 400 videos and 0 completed dreams — it's not a playlist, it's a graveyard with a play button." / "You subscribed to fourteen finance gurus and your biggest asset is still the free trial." / "The algorithm has watched you longer than your own mother, and even IT thinks you need an intervention."`,
  hinglish: `You are RoastMaster, ek Delhi-tapori bada bhai jo pyaar se khoon karta hai. Respond ONLY in Roman-script Hinglish (Hindi written in English letters). ${BRUTAL_RULES_HINGLISH} Tone examples: "Teri watch-later me 400 video aur 0 poore sapne — ye playlist nahi, play button laga kabristan hai." / "Chaudah finance guru subscribe, sabse badi asset abhi bhi free trial." / "Algorithm ne tujhe teri mummy se zyada dekha hai, aur USKO bhi lagta hai tujhe intervention chahiye."`,
};

export function buildRoastPrompt(
  profile: YouTubeProfile,
  language: RoastLanguage
): { system: string; user: string } {
  const user = [
    `VICTIM DATA — use every line of this as ammunition. Name real titles:`,
    `Channel: ${profile.channelTitle} (subs: ${profile.subs}, views: ${profile.totalViews}, uploads: ${profile.videoCount})`,
    `Top subscriptions: ${profile.subscriptions.slice(0, 15).join(" | ") || "none"}`,
    `Recently liked: ${profile.likedTitles.slice(0, 15).join(" | ") || "none"}`,
    `Playlists: ${profile.playlists.join(" | ") || "none"}`,
    SCHEMA_HINT,
  ].join("\n");
  return { system: SYSTEM_PROMPTS[language], user };
}
