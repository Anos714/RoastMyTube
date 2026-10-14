import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { roasts } from "@/db/schema";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/lib/errors";

export async function GET() {
  try {
    const user = await requireUser();
    const rows = await db
      .select({
        id: roasts.id,
        language: roasts.language,
        brainRotScore: roasts.brainRotScore,
        createdAt: roasts.createdAt,
        report: roasts.report,
      })
      .from(roasts)
      .where(eq(roasts.userId, user.id))
      .orderBy(desc(roasts.createdAt))
      .limit(10);
    return NextResponse.json(rows);
  } catch (err) {
    return toErrorResponse(err);
  }
}

export async function DELETE() {
  try {
    const user = await requireUser();
    await db.delete(roasts).where(eq(roasts.userId, user.id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return toErrorResponse(err);
  }
}
