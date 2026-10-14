import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { getValidAccessToken } from "@/lib/google-token";
import { getYouTubeProfile } from "@/lib/youtube";
import { toErrorResponse } from "@/lib/errors";

export async function GET() {
  try {
    const user = await requireUser();
    const token = await getValidAccessToken(user.id);
    const profile = await getYouTubeProfile(token);
    return NextResponse.json(profile);
  } catch (err) {
    return toErrorResponse(err);
  }
}
