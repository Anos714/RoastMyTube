import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  ROAST_SCHEMA,
  buildRoastPrompt,
  type RoastLanguage,
  type RoastReport,
} from "./i18n-roast";
import type { YouTubeProfile } from "./youtube";
import { LlmRateError, RoastFailedError } from "./errors";

const GROQ_BASE = "https://api.groq.com/openai/v1";
const L1 = process.env.LLM_MODEL ?? "openai/gpt-oss-120b";
const L2 = process.env.LLM_FALLBACK_MODEL ?? "openai/gpt-oss-20b";

function groqClient() {
  if (!process.env.GROQ_API_KEY) throw new RoastFailedError();
  return new OpenAI({ baseURL: GROQ_BASE, apiKey: process.env.GROQ_API_KEY });
}

function isRateLimit(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  if (status === 429) return true;
  const msg = err instanceof Error ? err.message : String(err);
  return /429|rate.?limit|RESOURCE_EXHAUSTED/i.test(msg);
}

function looksBlocked(text: string): boolean {
  if (!text.trim()) return true;
  return /^\s*(i'?m sorry|i (can'?t|cannot)|as an ai language model)/i.test(text);
}

function parseReport(text: string): RoastReport {
  const clean = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return ROAST_SCHEMA.parse(JSON.parse(clean));
}

async function callGroq(model: string, system: string, user: string): Promise<string> {
  const res = await groqClient().chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.9,
    max_tokens: 1500,
  });
  const u = res.usage;
  console.log(
    `[roast] provider=groq model=${model} prompt_tokens=${u?.prompt_tokens ?? "?"} completion_tokens=${u?.completion_tokens ?? "?"}`
  );
  return res.choices[0]?.message?.content ?? "";
}

async function callGemini(system: string, user: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) throw new RoastFailedError();
  const gen = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = gen.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: system,
    generationConfig: { responseMimeType: "application/json", temperature: 0.9 },
  });
  const res = await model.generateContent(user);
  const resp = res.response;
  const usage = (resp as { usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number } }).usageMetadata;
  console.log(
    `[roast] provider=gemini prompt_tokens=${usage?.promptTokenCount ?? "?"} completion_tokens=${usage?.candidatesTokenCount ?? "?"}`
  );
  return resp.text();
}

/** One level with a single parse-retry. Throws on transport/rate errors. */
async function tryLevel(
  call: () => Promise<string>,
  label: string
): Promise<RoastReport> {
  let lastErr: unknown = new Error("empty");
  for (let attempt = 0; attempt < 2; attempt++) {
    const text = await call(); // transport errors propagate (no retry here)
    if (looksBlocked(text)) {
      lastErr = new Error(`blocked:${label}`);
      break;
    }
    try {
      return parseReport(text);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export type RoastResult = RoastReport & { language: string; hinglish_blocked?: boolean };

/** L1 Groq 120b → L2 Groq 20b (own quota pool) → L3 Gemini. Hinglish block → full chain in English. */
export async function generateRoast(
  profile: YouTubeProfile,
  language: RoastLanguage
): Promise<RoastResult> {
  let rateLimitedLevels = 0;

  const runChain = async (lang: RoastLanguage): Promise<RoastReport> => {
    const { system, user } = buildRoastPrompt(profile, lang);
    const levels: { label: string; call: () => Promise<RoastReport> }[] = [
      { label: `groq:${L1}`, call: () => tryLevel(() => callGroq(L1, system, user), "l1") },
      { label: `groq:${L2}`, call: () => tryLevel(() => callGroq(L2, system, user), "l2") },
      { label: "gemini", call: () => tryLevel(() => callGemini(system, user), "l3") },
    ];
    let lastErr: unknown = new RoastFailedError();
    for (const level of levels) {
      try {
        return await level.call();
      } catch (e) {
        if (isRateLimit(e)) rateLimitedLevels++;
        lastErr = e;
      }
    }
    throw lastErr;
  };

  try {
    const report = await runChain(language);
    return { ...report, language };
  } catch {
    // Safety fallback: if Hinglish failed at every level (block or breakage),
    // run the whole chain once more in English rather than erroring out.
    if (language === "hinglish") {
      try {
        const report = await runChain("en");
        return { ...report, language: "en", hinglish_blocked: true };
      } catch {
        // fall through to final mapping
      }
    }
    if (rateLimitedLevels >= 3) throw new LlmRateError();
    throw new RoastFailedError();
  }
}
