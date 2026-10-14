import { NextResponse, type NextRequest } from "next/server";
import { LanguageSchema, type RoastReport } from "@/lib/i18n-roast";

const EN: RoastReport = {
  roast:
    "Your “watch later” playlist has 400 videos and zero completed dreams — that's not a playlist, that's a graveyard with a play button. You consume “How to make $10k/month” like medicine and remain financially homeopathic. Fourteen finance gurus subscribed, and your biggest asset is still the free trial. The algorithm has observed you longer than your own mother, and even IT filed for an intervention. You don't have a sleep schedule, you have a surrender schedule. Somewhere between the Minecraft parkour and the 2AM breakup playlists, your ambition didn't die — it just got demonetized.",
  brainRotScore: 94,
  rank: "Clinically Overcooked",
  redFlags: [
    "Treats “watch later” as a retirement plan for dreams — 400 saved, 0 finished",
    "Takes notes from productivity videos, files them directly into the void",
    "Knows every creator's upload schedule better than his own family's birthdays",
  ],
  personalityTitle: "CEO of Tomorrow, Intern of Today",
  channelRoasts: [
    "Finance Guru #7: your net worth went DOWN since subscribing — historic reverse mentorship.",
    "Minecraft Parkour Daily: a grown adult studying block jumping like it's a pension scheme.",
    "LoFi Girl: she finished six degrees in the time you finished zero videos — log off.",
  ],
  loveLifePrediction:
    "Your crush will reply faster than your “someday” playlist ever will — which is to say, never. The red arrows lied to you.",
};

const HINGLISH: RoastReport = {
  roast:
    "Teri watch-later me 400 video aur 0 poore sapne — ye playlist nahi, play button laga kabristan hai. “$10k/month kaise kamaye” dawai ki tarah khaata hai, ameer homeopathy se bhi nahi hua. Chaudah finance guru subscribe, sabse badi asset abhi bhi free trial. Algorithm ne tujhe teri mummy se zyada observe kiya hai, aur USNE bhi intervention file kar di. Tera koi sleep schedule nahi, surrender schedule hai. Minecraft parkour aur 2 baje wali breakup playlists ke beech me teri ambition mari nahi — demonetize ho gayi.",
  brainRotScore: 94,
  rank: "Clinically Overcooked",
  redFlags: [
    "Watch-later ko sapno ka retirement plan bana rakha — 400 save, 0 poore",
    "Productivity video se notes banata hai, seedha void me file karta hai",
    "Creators ka upload schedule ghar walon ke birthday se zyada yaad hai",
  ],
  personalityTitle: "Kal Ka CEO, Aaj Ka Intern",
  channelRoasts: [
    "Finance Guru #7: subscribe ke baad net worth ulta ghati — historic reverse mentorship.",
    "Minecraft Parkour Daily: block jumping ko pension scheme samajh ke padh raha hai.",
    "LoFi Girl: usne 6 degree le li, tune 0 video poori ki — log off kar.",
  ],
  loveLifePrediction:
    "Crush ka reply teri “someday” playlist se pehle aayega — matlab kabhi nahi. Red arrow ne dhokha diya.",
};

export async function GET(req: NextRequest) {
  const lang = LanguageSchema.catch("en").parse(
    new URL(req.url).searchParams.get("lang") ?? "en"
  );
  return NextResponse.json({ ...(lang === "hinglish" ? HINGLISH : EN), language: lang });
}
