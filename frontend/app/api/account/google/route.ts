import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { account } from "@/db/schema";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/lib/errors";

/** Disconnect YouTube: best-effort token revoke + delete the Google account row. Next login re-consents. */
export async function DELETE() {
  try {
    const user = await requireUser();
    const rows = await db
      .select()
      .from(account)
      .where(and(eq(account.userId, user.id), eq(account.providerId, "google")))
      .limit(1);

    const row = rows[0];
    if (row?.accessToken) {
      await fetch(
        `https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(row.accessToken)}`,
        { method: "POST" }
      ).catch(() => {});
    }
    if (row) {
      await db.delete(account).where(eq(account.id, row.id));
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return toErrorResponse(err);
  }
}
