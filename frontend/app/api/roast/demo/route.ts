import { NextResponse, type NextRequest } from "next/server";
import { LanguageSchema, type RoastReport } from "@/lib/i18n-roast";

const EN: RoastReport = {
  roast:
    "Bro watches “How to make $10k/month” between Minecraft parkour compilations and breakup playlists at 2AM. Subscribed to fourteen finance gurus yet Googles “free food near me” with complete confidence. The algorithm has studied you for years and its conclusion is devastating: you are either a future billionaire doing deep research, or a raccoon with WiFi and unlimited free time. Every data point screams raccoon. Your watch-later playlist is a museum of ambitions you abandoned by Tuesday.",
  brainRotScore: 87,
  rank: "Terminally Cooked",
  redFlags: [
    "Saves gym motivation videos but skips leg day AND the video",
    "Watches everything at 2x speed and still understands nothing",
    "Binges dating advice, still opens with just “hey”",
  ],
  personalityTitle: "3AM Sigma Grinder Who Never Grinds",
  channelRoasts: [
    "Finance Guru #7: your net worth went down since subscribing, impressive reverse mentorship.",
    "Minecraft Parkour Daily: thirty years old watching block jumping like it pays rent.",
    "LoFi Girl: she has been studying for six years straight — take the hint and log off.",
  ],
  loveLifePrediction:
    "Your watch history will stay “it's complicated” until you stop falling for thumbnails with red arrows.",
};

const HINGLISH: RoastReport = {
  roast:
    "Bhai 3 baje dopahar me “5AM Club kaise join kare” dekh raha hai, uthta 11 baje hai. Chaudah finance guru subscribe kar rakhe hain, balance me 214 rupaye hain. Algorithm ne saalon research karke ek hi baat boli hai: ya to tu future billionaire hai, ya WiFi wala kabootar. Aur beta, saare signals kabootar bol rahe hain. Teri watch-later playlist un sapno ka kabristan hai jo Tuesday tak dafan ho gaye.",
  brainRotScore: 87,
  rank: "Terminally Cooked",
  redFlags: [
    "Gym motivation save karta hai, leg day aur video dono skip",
    "Sab 2x speed pe dekhta hai, samajh phir bhi zero",
    "Dating advice ke 40 video, message phir bhi sirf “hey”",
  ],
  personalityTitle: "3 Baje Wala Sigma, Uthta 11 Baje",
  channelRoasts: [
    "Finance Guru #7: subscribe ke baad balance ulta ghat gaya, reverse mentorship ho gayi.",
    "Minecraft Parkour Daily: block wali jumping dekh ke lagta hai kiraya wahi dega.",
    "LoFi Girl: wo 6 saal se padh rahi hai — hint samajh aur log off kar.",
  ],
  loveLifePrediction:
    "Jab tak red arrow wale thumbnails pe fisalta rahega, relationship status “it's complicated” hi rahega.",
};

export async function GET(req: NextRequest) {
  const lang = LanguageSchema.catch("en").parse(
    new URL(req.url).searchParams.get("lang") ?? "en"
  );
  return NextResponse.json({ ...(lang === "hinglish" ? HINGLISH : EN), language: lang });
}
