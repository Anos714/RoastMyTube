import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { account } from "@/db/schema";
import { NeedReloginError } from "./errors";

const REFRESH_SKEW_MS = 5 * 60 * 1000;

/** Returns a fresh Google access token, refreshing + persisting if near expiry. */
export async function getValidAccessToken(userId: string): Promise<string> {
  const rows = await db
    .select()
    .from(account)
    .where(and(eq(account.userId, userId), eq(account.providerId, "google")))
    .limit(1);

  const row = rows[0];
  if (!row?.accessToken) throw new NeedReloginError();

  const expiresAt = row.accessTokenExpiresAt?.getTime() ?? 0;
  if (expiresAt - Date.now() > REFRESH_SKEW_MS) return row.accessToken;
  if (!row.refreshToken) throw new NeedReloginError();

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: row.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new NeedReloginError();

  const data = (await res.json()) as { access_token: string; expires_in: number };
  await db
    .update(account)
    .set({
      accessToken: data.access_token,
      accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
      updatedAt: new Date(),
    })
    .where(eq(account.id, row.id));

  return data.access_token;
}
