import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { account, roasts, session, user } from "@/db/schema";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/lib/errors";

/** Full account wipe: roasts → sessions → OAuth accounts → user row. Client signs out after. */
export async function DELETE() {
  try {
    const u = await requireUser();
    await db.delete(roasts).where(eq(roasts.userId, u.id));
    await db.delete(session).where(eq(session.userId, u.id));
    await db.delete(account).where(eq(account.userId, u.id));
    await db.delete(user).where(eq(user.id, u.id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return toErrorResponse(err);
  }
}
