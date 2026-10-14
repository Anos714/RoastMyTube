// MANUAL QA CHECKLIST (needs real keys in .env.local first):
// 1. GCP: YouTube Data API v3 enabled + OAuth consent screen has test users.
// 2. POST /api/roast logged-out → 401 {error:"unauthorized"}.
// 3. Login via /api/auth/signin/google, then POST {} → 200 English roast + row in roasts table.
// 4. POST {language:"hinglish"} → 200 Hinglish roast.
// 5. 11 rapid POSTs → 429 {error:"slow_down"} (10/min throttle).
// 6. Revoke YouTube access → POST → 401 {error:"relogin"}.
// 7. GET /api/roast/history → last 10, newest first.
// 8. GET /api/roast/demo?lang=en + ?lang=hinglish → valid schema, no auth.

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { roasts } from "@/db/schema";
import { requireUser } from "@/lib/require-user";
import { getValidAccessToken } from "@/lib/google-token";
import { getYouTubeProfile } from "@/lib/youtube";
import { LanguageSchema, TakeoutSummarySchema } from "@/lib/i18n-roast";
import { generateRoast } from "@/lib/llm";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { toErrorResponse } from "@/lib/errors";

const BodySchema = z.object({
  language: LanguageSchema.optional(),
  takeout: TakeoutSummarySchema.optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    if (!checkRateLimit(getClientIp(req))) {
      return NextResponse.json({ error: "slow_down" }, { status: 429 });
    }
    const { language = "en", takeout } = BodySchema.parse(
      await req.json().catch(() => ({}))
    );

    const token = await getValidAccessToken(user.id);
    const profile = await getYouTubeProfile(token);
    const result = await generateRoast(profile, language, takeout);

    await db.insert(roasts).values({
      userId: user.id,
      language: result.language,
      report: result,
      brainRotScore: result.brainRotScore,
    });

    return NextResponse.json(result);
  } catch (err) {
    return toErrorResponse(err);
  }
}
